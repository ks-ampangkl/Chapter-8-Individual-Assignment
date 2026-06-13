<script setup> 
import { ref, onMounted } from 'vue' 
import EmployeeForm from './components/EmployeeForm.vue' 
import EmployeeList from './components/EmployeeList.vue' 
import EmployeeControls from './components/EmployeeControls.vue'
import { 
  getEmployees, createEmployee, updateEmployee, deleteEmployee 
} from './api/employeeApi.js' 
  
const employees       = ref([]) 
const editingEmployee  = ref(null) 
const loading         = ref(false) 
const errorMsg        = ref('') 
const currentFilters = ref({ q: '', sortBy: '', order: 'asc' })

// --- Fetch Data from Backend API ---
async function load() { 
  loading.value = true 
  errorMsg.value = '' 
  try { 
    // Pass the filter parameters object straight into your Axios helper
    const { data } = await getEmployees(currentFilters.value) 
    employees.value = data 
  } catch (e) { 
    errorMsg.value = e.message || 'Failed to load employee records.' 
  } finally { 
    loading.value = false 
  } 
}
  
// --- Handle Form Submissions (Create / Update) ---
async function handleSave(payload) { 
  try { 
    if (editingEmployee.value) { 
      // Aligns with the backend string lookup route using empId (e.g., EMP001)
      await updateEmployee(editingEmployee.value.empId, payload) 
      editingEmployee.value = null 
    } else { 
      await createEmployee(payload) 
    } 
    // Freshly pull data after changes to ensure parity with the database
    await load() 
  } catch (e) { 
    errorMsg.value = e.message || 'Save failed. Check the console or your field configurations.' 
  } 
} 
  
// --- Component Communication Event Hooks ---
function handleEdit(emp)   { editingEmployee.value = { ...emp } } 
function handleCancel()    { editingEmployee.value = null } 
  
// --- Handle Records Deletion ---
async function handleDelete(empId) { 
  if (!confirm(`Are you sure you want to delete employee ${empId}? This action cannot be undone.`)) return 
  try { 
    // Hits the backend route: DELETE /employees/:id
    await deleteEmployee(empId) 
    await load() 
  } catch (e) { 
    errorMsg.value = e.message || 'Delete operation failed.' 
  } 

} 


  function handleFilterChange(newFilters) {
  currentFilters.value = newFilters
  load() // Re-fetch from MySQL instantly with query params applied
}
  
// Initialize the view automatically when the DOM mounts
onMounted(load) 
</script> 
  
<template> 
  <header> 
    <h1>Employee Directory Application</h1> 
    <p class="subtitle">Vue 3 · Axios · Express · MySQL</p> 
  </header> 
  
  <main> 
    <p v-if="loading" class="loading">Fetching employee directory records…</p> 
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p> 
  
    <EmployeeForm 
      :editingEmployee="editingEmployee" 
      @save="handleSave" 
      @cancel="handleCancel" /> 
  
      <EmployeeControls @filter-change="handleFilterChange" />
      
    <EmployeeList 
      :employees="employees" 
      @edit="handleEdit" 
      @delete="handleDelete" /> 
  </main> 
</template>