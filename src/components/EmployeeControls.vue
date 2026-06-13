<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['filter-change'])

const search = ref('')
const sortBy = ref('')
const order  = ref('asc')

// Watch all three reactive inputs. Whenever any of them changes, 
// emit the fresh values immediately up to the parent component (App.vue).
watch([search, sortBy, order], () => {
  emit('filter-change', {
    q: search.value.trim(),
    sortBy: sortBy.value,
    order: order.value
  })
})

function clearFilters() {
  search.value = ''
  sortBy.value = ''
  order.value = 'asc'
}
</script>

<template>
  <div class="employee-controls">
    <div class="control-group search-box">
      <input 
        v-model="search" 
        type="text" 
        placeholder="Search by Name, ID, or Email..." 
      />
    </div>

    <div class="control-group sort-box">
      <select v-model="sortBy">
        <option value="">-- Sort By (Default) --</option>
        <option value="name">Name</option>
        <option value="hireDate">Hire Date</option>
        <option value="salary">Monthly Salary</option>
      </select>

      <select v-model="order" :disabled="!sortBy">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button 
        type="button" 
        @click="clearFilters" 
        v-if="search || sortBy" 
        class="btn-clear"
      >
        Clear
      </button>
    </div>
  </div>
</template>

<style scoped>
.employee-controls {
  background: white;
  padding: 1rem 1.2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}
.control-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.search-box input {
  width: 280px;
  padding: 0.45rem 0.6rem;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
}
select {
  padding: 0.45rem 0.6rem;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  background: white;
}
.btn-clear {
  padding: 0.45rem 0.8rem;
  border: 1px solid #cbd5e1;
  background: #f1f5f9;
  color: #334155;
  border-radius: 4px;
  cursor: pointer;
}
.btn-clear:hover {
  background: #e2e8f0;
}
</style>