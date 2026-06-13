import axios from 'axios' 
  
// 1. Pre-configured Axios instance 
const apiClient = axios.create({ 
  // Assignment brief explicitly requires Express to be hosted on port 3001
  baseURL: 'http://localhost:3001', 
  timeout: 5000, 
  headers: { 
    'Content-Type': 'application/json', 
    Accept: 'application/json' 
  } 
}) 
  
// 2. Request interceptor — runs before every outgoing request to log methods and paths
apiClient.interceptors.request.use( 
  (config) => { 
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`) 
    return config 
  }, 
  (error) => Promise.reject(error) 
) 
  
// 3. Response interceptor — runs on every response to streamline unified error rendering
apiClient.interceptors.response.use( 
  (response) => response, 
  (error) => { 
    let friendlyMessage = 'An unexpected application error occurred.'

    if (error.response) { 
      // Server responded with an explicit error code (e.g., 400, 404, 409)
      console.error(`[API ERROR] ${error.response.status} - ${error.response.statusText}`)
      friendlyMessage = error.response.data?.error || `Server Error (${error.response.status})`
    } else if (error.request) { 
      // Request went out but no answer returned (Server is offline)
      console.error('[API ERROR] No response from server (is the API running?)') 
      friendlyMessage = 'Unable to reach the server. Please check if the API backend is running.'
    } else { 
      // Setting up the request triggered an internal execution issue
      console.error('[API ERROR]', error.message) 
      friendlyMessage = error.message
    } 

    // Overwriting the error object message allows your Vue components to catch a human-readable string directly
    error.message = friendlyMessage
    return Promise.reject(error) 
  } 
) 
  
// 4. CRUD helpers adapted for employee data operations
export const getEmployees = (params = {}) => 
  apiClient.get('/employees', { params }) 

export const getEmployee = (empId) => 
  apiClient.get(`/employees/${empId}`)

export const createEmployee = (employeeData) => 
  apiClient.post('/employees', employeeData) 

// Aligns with backend router structures using alphanumeric string keys (e.g., EMP001)
export const updateEmployee = (empId, employeeData) => 
  apiClient.put(`/employees/${empId}`, employeeData) 

export const deleteEmployee = (empId) => 
  apiClient.delete(`/employees/${empId}`) 
  
export default apiClient