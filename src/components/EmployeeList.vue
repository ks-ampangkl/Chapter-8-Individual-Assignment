<script setup> 
// Receive the array of employees passed down from App.vue orchestration
defineProps({ 
  employees: { type: Array, required: true } 
}) 

// Define events to bubble click operations up to App.vue
const emit = defineEmits(['edit', 'delete']) 
</script>

<template> 
  <div v-if="!employees.length" class="empty"> 
    No matching employee profiles found. Register a new employee or adjust your search filter terms.
  </div> 
  
  <table v-else class="employee-table"> 
    <thead> 
      <tr> 
        <th>ID</th>
        <th>Employee Details</th>
        <th>Department</th> 
        <th>Position</th>
        <th>Hire Date</th>
        <th>Monthly Salary</th>
        <th>Status</th>
        <th>Actions</th> 
      </tr> 
    </thead> 
    <tbody> 
      <tr v-for="emp in employees" :key="emp.empId"> 
        <td><code>{{ emp.empId }}</code></td> 
        
        <td> 
          <strong>{{ emp.name }}</strong> 
          <div class="muted">{{ emp.email }}</div> 
        </td> 
        
        <td>{{ emp.department }}</td> 
        <td>{{ emp.position }}</td>
        <td>{{ emp.hireDate }}</td>
        
        <td>RM {{ Number(emp.salary).toFixed(2) }}</td> 
        
        <td> 
          <span :class="emp.active ? 'badge ok' : 'badge no'"> 
            {{ emp.active ? 'Active' : 'Inactive' }} 
          </span> 
        </td> 
        
        <td> 
          <button @click="emit('edit', emp)">Edit</button> 
          
          <button class="danger" @click="emit('delete', emp.empId)">Delete</button> 
        </td> 
      </tr> 
    </tbody> 
  </table> 
</template>