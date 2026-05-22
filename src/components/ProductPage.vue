<template>
    <div class="product-page">
        <button class="back-btn" @click="goBack">← Back</button>
        <div v-if="product" class="product-detail">
            <h2>{{ product.title }}</h2>
            <img :src="product.thumbnail" :alt="product.title">
            <p>Price: <span style="text-decoration: line-through; color: red;">
                    ${{ product.price }}
                </span><span class="discount">{{ product.discountPercentage }}</span>
            </p>
            <p>Rating: {{ product.rating }}</p>
            <div class="review-container">
                <h3>Reviews</h3>
                <ul class="reviews">
                    <li v-for="review in product.reviews" :key="review.id">
                        <h4>{{ review.reviewerName }}</h4>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.comment }}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else class="loading">Loading product...</div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const product = ref(null)
const router = useRouter()

const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    }
})

function goBack() {
    router.back()
}

onMounted(async () => {
    try {
        const response = await axios.get(`https://dummyjson.com/products/${props.id}`)
        product.value = response.data
    } catch (error) {
        console.error('Error fetching product details:', error)
    }
})
</script>

<style scoped>
.product-page {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.back-btn {
    padding: 10px 20px;
    margin-bottom: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.back-btn:hover {
    background-color: #e0e0e0;
}

.product-detail {
    background: white;
    padding: 20px;
    border-radius: 8px;
}

.product-detail h2 {
    font-size: 28px;
    margin-bottom: 20px;
}

.product-detail img {
    max-width: 400px;
    height: auto;
    margin-bottom: 20px;
    border-radius: 5px;
}

.discount {
    color: green;
    font-weight: bold;
    margin-left: 10px;
}

.review-container {
    margin-top: 30px;
}

.review-container h3 {
    margin-bottom: 15px;
    font-size: 20px;
}

.reviews {
    list-style: none;
    padding: 0;
}

.reviews li {
    background: #f9f9f9;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    border-left: 4px solid #007bff;
}

.reviews h4 {
    margin-top: 0;
    color: #333;
}

.reviews p {
    margin: 5px 0;
    color: #666;
}

.loading {
    padding: 20px;
    text-align: center;
    font-size: 18px;
}
</style>
