<template>
    <div class="sidebar-wrapper">
        <button class="sidebar-toggle" @click="toggleOpen" aria-label="Toggle categories">
            <i class="fa-solid fa-plus"></i>
        </button>

        <div class="sidebar" :class="{ open: open }">
            <h2>DummyJSON Product</h2>
            <div class="categories-container">
                <button :class="['category-item', { active: selectedCategory === '' }]" @click="selectCategory('')">
                    All
                </button>
                <button v-for="category in categories" :key="category"
                    :class="['category-item', { active: selectedCategory === category }]" @click="selectCategory(category)">
                    {{ category }}
                </button>
            </div>
        </div>

        <div v-if="open" class="sidebar-overlay" @click="toggleOpen" />
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
const open = ref(false)

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
    // close sidebar on mobile after selecting
    open.value = false
}

const toggleOpen = () => {
    open.value = !open.value
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

.sidebar {
    flex: 0 0 260px;
    width: 260px;
    padding: 24px;
    background-color: #ffffff;
    border-radius: 24px;
    box-shadow: 0 20px 55px rgba(15, 23, 42, 0.08);
    border: 1px solid rgba(148, 163, 184, 0.16);
    align-self: flex-start;
}

.sidebar h2 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.6em;
    color: #111827;
}

.categories-container {
    display: grid;
    gap: 12px;
}

.category-item {
    border: 1px solid #e2e8f0;
    padding: 14px 16px;
    border-radius: 999px;
    background-color: #f8fafc;
    color: #0f172a;
    font-weight: 600;
    text-align: left;
    transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.category-item.active {
    background-color: #2563eb;
    color: #ffffff;
    border-color: transparent;
    box-shadow: 0 12px 30px rgba(37, 99, 235, 0.18);
}

.category-item:hover {
    background-color: #e2e8f0;
    border-color: #cbd5e1;
    cursor: pointer;
    transform: translateY(-1px);
}

.category-item:active {
    background-color: #dbeafe;
    border-color: #93c5fd;
}

/* Toggle button (hamburger) */
.sidebar-toggle {
    position: fixed;
    left: 16px;
    top: 16px;
    z-index: 80;
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: #ffffff;
    border: 1px solid rgba(15, 23, 42, 0.06);
    display: none;
    align-items: center;
    justify-content: center;
    padding: 8px;
    box-shadow: 0 8px 20px rgba(2,6,23,0.08);
}
.sidebar-toggle .bar {
    display: block;
    width: 18px;
    height: 2px;
    background: #0f172a;
    margin: 3px 0;
    border-radius: 2px;
}

.sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.36);
    z-index: 70;
}

@media (max-width: 980px) {
    .sidebar-wrapper {
        pointer-events: none;
    }
    .sidebar-toggle {
        display: flex;
        pointer-events: auto;
    }
    .sidebar {
        position: fixed;
        left: 0;
        top: 16px;
        bottom: 16px;
        width: 280px;
        transform: translateX(-110%);
        transition: transform 320ms cubic-bezier(.2,.9,.2,1);
        z-index: 75;
        pointer-events: auto;
    }
    .sidebar.open {
        transform: translateX(0);
    }
    /* ensure the sidebar still looks like a panel, not a full-width top bar */
    .sidebar {
        border-radius: 16px;
    }
}

</style>