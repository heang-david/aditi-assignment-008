<template>
    <div class="sidebar">
        <h2>DummyJSON Product</h2>
        <div class="categories-container">
            <button
                :class="['category-item', { active: selectedCategory === '' }]"
                @click="selectCategory('')"
            >
                All
            </button>
            <button
                v-for="category in categories"
                :key="category"
                :class="['category-item', { active: selectedCategory === category }]"
                @click="selectCategory(category)"
            >
                {{ category }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  selectedCategory: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['category-selected'])
const categories = ref([])

const fetchCategories = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products/category-list')
        const data = await response.json()
        categories.value = data
    } catch (error) {
        console.error('Error fetching categories:', error)
    }
}

const selectCategory = (category) => {
    emit('category-selected', category)
}

onMounted(() => {
    fetchCategories()
})

</script>

<style scoped>
.category-list {
    list-style: none;
    padding: 0;
}
.category-item {
    margin-bottom: 5px;
    margin-right: 5px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 4px;
    background-color: #fff;
    transition: background-color 0.3s, border-color 0.3s;
}
.sidebar {
    width: 250px;
    padding: 20px;
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
}
.sidebar h2 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.5em;
    color: #333;
}

.category-item:hover {
    background-color: #e0e0e0;
    border-color: #bbb;
    cursor: pointer;
}
.category-item:active {
    background-color: #d0d0d0;
    border-color: #aaa;
}
</style>