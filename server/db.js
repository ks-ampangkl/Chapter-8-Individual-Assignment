const mysql = require('mysql2/promise') 
  
const pool = mysql.createPool({ 
  host: 'localhost', 
  port: 3306, 
  user: 'root', 
  password: '',              
  database: 'employee_directory',  // ◄ CHANGE THIS LINE from 'student_records'
  waitForConnections: true, 
  connectionLimit: 10, 
  queueLimit: 0 
}) 
  
module.exports = pool