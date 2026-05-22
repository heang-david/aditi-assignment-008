<template>
    <div class="item-card" @click="goToProduct">
        <h2>{{ product.title }}</h2>
        <p>Price: <span style="text-decoration: line-through; color: red;">
                ${{ product.price }}
            </span><span class="discount">{{ product.discountPercentage }}</span>
        </p>
        <p>Rating: {{ product.rating }}</p>
        <img :src="product.thumbnail" :alt="product.title">
    </div>

</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const router = useRouter()

function goToProduct() {
    router.push({ name: 'product', params: { id: props.product.id } })
}


</script>

<style scoped>
.item-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    width: 300px;
    height: 500px;
    cursor: pointer;
}

.item-card img {
    width: 100%;
    height: auto;
    object-fit: cover;
}
.discount {
    color: green;
    font-weight: bold;
    margin-left: 10px;
}
</style>