<template>
    
    <div class="home-page">
        <SideBar :selectedCategory="selectedCategory" @category-selected="handleCategoryChange" />
        <div class="main-content">
            <Header/>
            <div class="search-container">
                <input
                    type="search"
                    v-model="searchQuery"
                    placeholder="Search products..."
                    aria-label="Search products"
                />
                <span class="result-count">{{ isLoading ? 'Loading...' : `${products.products.length} products found` }}</span>
            </div>
            <div class="product-container">
                    <div v-for="product in products.products" :key="product.id" >
                        <ItemCard :product="product" />
                    </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref , onMounted, watch } from 'vue'
    import axios from 'axios'
    import ItemCard from './ItemCard.vue'
    import Header from './Header.vue'
    import SideBar from './SideBar.vue'

    const products = ref({ products: [] })
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const isLoading = ref(false)

    const fetchProducts = async (query = '') => {
        isLoading.value = true
        try {
            let response
            if (query.trim()) {
                response = await axios.get(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`)
            } else if (selectedCategory.value) {
                response = await axios.get(`https://dummyjson.com/products/category/${encodeURIComponent(selectedCategory.value)}`)
            } else {
                response = await axios.get('https://dummyjson.com/products?limit=100')
            }
            products.value = response.data
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            isLoading.value = false
        }
    }

    const handleCategoryChange = (category) => {
        selectedCategory.value = category
        searchQuery.value = ''
        fetchProducts()
    }

    watch(searchQuery, (newQuery) => {
        fetchProducts(newQuery)
    }, { debounce: 400 })

    onMounted(() => {
        fetchProducts()
    })
</script>

<style scoped>
.home-page {
    display: flex;
}
.main-content {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding: 20px;
    flex-wrap: wrap;
}

.search-container input {
    width: min(100%, 380px);
    padding: 12px 16px;
    border: 1px solid #ccc;
    border-radius: 999px;
    font-size: 16px;
    outline: none;
}

.search-container input:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.12);
}

.result-count {
    color: #555;
    font-size: 14px;
}

.product-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    justify-content: center;
}

</style>