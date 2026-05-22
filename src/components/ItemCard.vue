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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
    border: 1px solid rgba(148, 163, 184, 0.24);
    border-radius: 24px;
    padding: 20px;
    background: #ffffff;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    min-height: 420px;
}

.item-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 50px rgba(15, 23, 42, 0.14);
}

.item-card h2 {
    margin: 0;
    font-size: 1.1rem;
    color: #0f172a;
    line-height: 1.3;
    min-height: 52px;
}

.item-card p {
    margin: 0;
    color: #475569;
    font-size: 0.96rem;
    line-height: 1.5;
}

.item-card img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 18px;
}

.discount {
    color: #10b981;
    font-weight: 700;
    margin-left: 8px;
}
</style>