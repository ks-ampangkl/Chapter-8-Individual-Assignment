// server/index.js 
const express = require('express') 
const cors    = require('cors') 
const pool    = require('./db') 
  
const app = express() 
app.use(cors())     

app.use(express.json())      // parse application/json request bodies 
  
// --- Health check --- 
app.get('/', (req, res) => res.json({ status: 'ok' })) 
  
// --- READ list (with optional search & sort) --- 
app.get('/employees', async (req, res) => { 
  try { 
    const { q, sortBy, order } = req.query 
    let sql = 'SELECT * FROM employees' 
    const params = [] 
  
    // Server-side search using SQL LIKE on at least three columns (name, empId, email) 
    if (q) { 
      sql += ` WHERE name LIKE ? 
                  OR empId LIKE ? 
                  OR email LIKE ?` 
      const like = `%${q}%` 
      params.push(like, like, like) 
    } 
  
    // Whitelisted server-side sorting (name, hireDate, salary) 
    const allowedSort = ['name', 'hireDate', 'salary'] 
    if (sortBy && allowedSort.includes(sortBy)) { 
      const direction = order === 'desc' ? 'DESC' : 'ASC' 
      sql += ` ORDER BY ${sortBy} ${direction}` 
    } else {
      // Default fallback sorting column
      sql += ` ORDER BY empId ASC`
    }
  
    const [rows] = await pool.query(sql, params) 
    res.json(rows) 
  } catch (err) { 
    console.error(err) 
    res.status(500).json({ error: 'Database error' }) 
  } 
}) 
  
// --- READ single --- 
app.get('/employees/:id', async (req, res) => { 
  try { 
    // Since empId is a unique string (e.g., EMP001), we match against empId [cite: 34]
    const [rows] = await pool.query( 
      'SELECT * FROM employees WHERE empId = ?', [req.params.id]) 
    if (!rows.length) return res.status(404).json({ error: 'Not found' }) 
    res.json(rows[0]) 
  } catch (err) { 
    res.status(500).json({ error: 'Database error' }) 
  } 
}) 
  
// --- CREATE --- 
app.post('/employees', async (req, res) => { 
  try { 
    // Destructuring fields specified by the assignment data model 
    const { empId, name, email, department, position, hireDate, salary, active } = req.body
    
    // INSERT into MySQL via a prepared statement placeholder array [cite: 45, 76]
    await pool.query( 
      `INSERT INTO employees 
         (empId, name, email, department, position, hireDate, salary, active)   
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
      [empId, name, email, department, position, hireDate, salary, active ? 1 : 0] 
    ) 
    // On success, respond with the created record 
    res.status(201).json(req.body) 
  } catch (err) { 
    if (err.code === 'ER_DUP_ENTRY') { 
      return res.status(409).json({ error: 'Employee ID or email already exists' }) 
    } 
    console.error(err) 
    res.status(500).json({ error: 'Database error' }) 
  } 
}) 
  
// --- UPDATE --- 
app.put('/employees/:id', async (req, res) => { 
  try { 
    const { name, email, department, position, hireDate, salary, active } = req.body 
    
    // UPDATE ... WHERE empId=? as required by the brief 
    const [r] = await pool.query( 
      `UPDATE employees SET 
         name=?, email=?, department=?, position=?, 
         hireDate=?, salary=?, active=? 
       WHERE empId=?`, 
      [name, email, department, position, hireDate, salary, 
       active ? 1 : 0, req.params.id] 
    ) 
    if (!r.affectedRows) return res.status(404).json({ error: 'Not found' }) 
    res.json({ empId: req.params.id, ...req.body }) 
  } catch (err) { 
    console.error(err)
    res.status(500).json({ error: 'Database error' }) 
  } 
}) 
  
// --- DELETE --- 
app.delete('/employees/:id', async (req, res) => { 
  try { 
    const [r] = await pool.query( 
      'DELETE FROM employees WHERE empId = ?', [req.params.id]) 
    if (!r.affectedRows) return res.status(404).json({ error: 'Not found' }) 
    res.json({ deleted: true }) 
  } catch (err) { 
    res.status(500).json({ error: 'Database error' }) 
  } 
}) 
  
// Assignment Brief explicitly mandates Express on Port 3001 
const PORT = 3001 
app.listen(PORT, () => 
  console.log(`API running at http://localhost:${PORT}`))