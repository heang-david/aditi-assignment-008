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
    gap: 20px;
    align-items: flex-start;
    padding: 24px;
    background: #f3f6fb;
    min-height: 100vh;
}
.main-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
    overflow: hidden;
}

.search-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 24px;
    flex-wrap: wrap;
    border-bottom: 1px solid #eef2f7;
    background: #ffffff;
}

.search-container input {
    flex: 1 1 320px;
    min-width: 220px;
    max-width: 520px;
    padding: 14px 18px;
    border: 1px solid #d2dae8;
    border-radius: 999px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-container input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.12);
}

.result-count {
    color: #475569;
    font-size: 14px;
    min-width: 160px;
}

.product-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px;
    padding-top: 24px;
    width: 100%;
}

@media (max-width: 980px) {
    .home-page {
        flex-direction: column;
        padding: 16px;
    }
    .main-content {
        border-radius: 20px;
    }
}

@media (max-width: 640px) {
    .search-container {
        justify-content: stretch;
        align-items: stretch;
    }
    .result-count {
        width: 100%;
        text-align: left;
        margin-top: 10px;
    }
}

</style>