<template>
    <ul>
        <li v-for="order in orders" :key="order.id" @click="moveDetail(order.id)">
            <div class="order-container">
                <div class="order-image" :style="`background-image: url(${getImageURL(order.image_src)})`"></div>
                <div class="order-info-wrapper">
                    <h2 class="order-name">{{ order.name }}</h2>
                    <p class="order-description">{{ order.request_detail }}</p>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue';
import { api } from '@/utils/axios'
import { useCommonStore } from '../../stores/common';
import { useRouter } from 'vue-router';
const router = useRouter();

function moveDetail(id) {
    router.push({
        name: "order-detail",
        params: { id: id },
    })
}

const common = useCommonStore();
const orders = ref([]);


async function getOrders() {
    const result = await api.orders.findAll();
    console.log(result.data);
    orders.value = result.data;
}

function getImageURL(image_src) {
    console.log(`${import.meta.env.VITE_API_URL}/${image_src}`);
    return `http://localhost:8080/${image_src}`;
}

common.changeTitle('주문 목록');
getOrders();
</script>


<style scoped>
.order-container {
    display: flex;
    align-items: center;
    border-bottom: 3px solid black;
}

.order-info-wrapper {
    margin: 0 auto;
    text-align: center;
}

.order-name {
    font-size: 25px;
    font-weight: bold;
}

.order-description {
    padding-top: 10px;
}

.order-image {
    background-size: cover;
    background-position: center;
    width: 180px;
    height: 180px;
}
</style>