<script setup> 
import { ref, watch, computed } from 'vue' 
  
// Receive the employee being edited from App.vue
const props = defineProps({ 
  editingEmployee: { type: Object, default: null } 
}) 

// Define events to notify App.vue when saving or cancelling
const emit = defineEmits(['save', 'cancel']) 
  
// Generator function to return a clean, empty form structure
const emptyForm = () => ({ 
  empId: '', 
  name: '', 
  email: '', 
  department: '', 
  position: '', 
  hireDate: '', 
  salary: '', 
  active: true 
}) 
  
const form   = ref(emptyForm()) 
const errors = ref({}) 
  
// Watcher to swap between editing data or resetting back to empty defaults
watch(() => props.editingEmployee, (val) => { 
  form.value   = val ? { ...val } : emptyForm() 
  errors.value = {} 
}, { immediate: true }) 
  
// Boolean helper flag to determine form headings, layout rules, and button texts
const isEditing = computed(() => Boolean(props.editingEmployee)) 

// --- Validation and Submission Logic ---

// Aligns with patterns like EMP001, EMP1234, or EMP99999 (EMP followed by 3 to 5 digits)
const empIdRegex = /^EMP[0-9]{3,5}$/i 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  
function validate() { 
  const e = {} 
  
  // 1. Employee ID Validation
  if (!form.value.empId.trim()) {
    e.empId = 'Employee ID is required.' 
  } else if (!empIdRegex.test(form.value.empId.trim())) {
    e.empId = 'Format must match "EMP" followed by 3 to 5 digits (e.g. EMP001, EMP9999).' 
  }
  
  // 2. Full Name Validation
  if (!form.value.name.trim() || form.value.name.trim().length < 3) {
    e.name = 'Name must be at least 3 characters long.' 
  }
  
  // 3. Email Validation
  if (!emailRegex.test(form.value.email.trim())) {
    e.email = 'Please enter a valid organizational email address.' 
  }
  
  // 4. Department & Position Validation
  if (!form.value.department.trim()) {
    e.department = 'Department selection or entry is required.' 
  }
  if (!form.value.position.trim()) {
    e.position = 'Job position title is required.' 
  }

  // 5. Hire Date Validation (Blocks choosing a date in the future)
  if (!form.value.hireDate) {
    e.hireDate = 'Hire date is required.'
  } else {
    const selectedDate = new Date(form.value.hireDate)
    const today = new Date()
    // Reset hour check parameters to compare pure dates accurately
    today.setHours(23, 59, 59, 999) 
    if (selectedDate > today) {
      e.hireDate = 'Hire date cannot be placed in the future.'
    }
  }

  // 6. Salary Boundary Check (RM 1,500 to RM 50,000)
  const salaryNum = Number(form.value.salary) 
  if (form.value.salary === '' || Number.isNaN(salaryNum) || salaryNum < 1500 || salaryNum > 50000) {
    e.salary = 'Monthly salary must sit between RM 1,500.00 and RM 50,000.00.' 
  }
  
  errors.value = e 
  return Object.keys(e).length === 0 
} 
  
function onSubmit() { 
  if (!validate()) return 
  
  // Package clean payload variables to emit upwards to App.vue orchestration routines
  emit('save', { 
    ...form.value, 
    empId:      form.value.empId.trim().toUpperCase(), 
    name:       form.value.name.trim(), 
    email:      form.value.email.trim(), 
    department: form.value.department.trim(), 
    position:   form.value.position.trim(), 
    salary:     Number(form.value.salary),
    active:     Boolean(form.value.active)
  }) 
  
  // Clear layout fields instantly on a brand-new addition
  if (!isEditing.value) form.value = emptyForm() 
} 
  
function onCancel() { 
  emit('cancel') 
  form.value   = emptyForm() 
  errors.value = {} 
}
</script>
<template> 
  <form @submit.prevent="onSubmit" class="employee-form"> 
    <h3>{{ isEditing ? 'Edit Employee Profile' : 'Register New Employee' }}</h3> 
  
    <label>Employee ID 
      <input 
        v-model.trim="form.empId" 
        placeholder="e.g., EMP001" 
        :disabled="isEditing" 
      /> 
      <span v-if="errors.empId" class="err">{{ errors.empId }}</span> 
    </label> 

    <label>Full Name 
      <input v-model.trim="form.name" placeholder="e.g., John Doe" /> 
      <span v-if="errors.name" class="err">{{ errors.name }}</span> 
    </label> 
  
    <label>Organisational Email 
      <input type="email" v-model.trim="form.email" placeholder="username@company.my" /> 
      <span v-if="errors.email" class="err">{{ errors.email }}</span> 
    </label> 
  
    <label>Department 
      <select v-model="form.department"> 
        <option value="">-- Select Department --</option> 
        <option value="IT">IT</option> 
        <option value="HR">HR</option> 
        <option value="Finance">Finance</option> 
        <option value="Marketing">Marketing</option> 
        <option value="Operations">Operations</option> 
      </select> 
      <span v-if="errors.department" class="err">{{ errors.department }}</span> 
    </label> 
  
    <label>Job Position Title 
      <input v-model.trim="form.position" placeholder="e.g., Software Engineer" /> 
      <span v-if="errors.position" class="err">{{ errors.position }}</span> 
    </label> 
  
    <label>Hire Date 
      <input type="date" v-model="form.hireDate" /> 
      <span v-if="errors.hireDate" class="err">{{ errors.hireDate }}</span> 
    </label> 
  
    <label>Monthly Salary (RM) 
      <input 
        type="number" 
        v-model.number="form.salary" 
        step="0.01" 
        placeholder="e.g., 3500.00" 
      /> 
      <span v-if="errors.salary" class="err">{{ errors.salary }}</span> 
    </label> 
  
    <div class="checkbox-group"> 
      <label> 
        <input type="checkbox" v-model="form.active" /> 
        Currently Employed (Active Status)
      </label> 
    </div> 
  
    <div class="actions"> 
      <button type="submit" class="btn-submit">
        {{ isEditing ? 'Update Employee' : 'Add Employee' }}
      </button> 
      <button type="button" @click="onCancel" class="btn-cancel">Cancel</button> 
    </div> 
  </form>
</template>