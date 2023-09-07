<template>
  <div class="card mb-2" v-if="data">
    <img :src="setImage(data.image_src)" class="card-img-top" alt="menu">
    <div class="card-body">
      <h5 class="card-title">{{ data.name }}</h5>
      <p class="card-text">{{ data.description }}</p>
      <div class="quantity-wrapper">
        <span>주문 수량</span>
        <div class="input-group mt-1 mb-3 w-50">
          <button @click="decreaseQ" class="btn btn-outline-secondary" type="button">-</button>
          <span type="number" class="form-control text-center" aria-label="Example text with two button addons">{{
            quantity }}</span>
          <button @click="quantity++" class="btn btn-outline-secondary" type="button">+</button>
        </div>
      </div>
      <div class="req-wrapper">
        <span>요구사항</span>
        <div class="input-group mt-1">
          <textarea v-model="req" clas="form-control" area-label="With textarea"></textarea>
        </div>
        <div class="button-wrapper mt-4">
          <button @click="placeOrder" type="button" class="btn btn-primary">수정하기</button>
          <button type="button" class="btn btn-outline-primary" ml-1 @click="moveList">뒤로가기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { api } from '@/utils/axios';

const route = useRoute();
const router = useRouter();
const data = ref(null);
const quantity = ref(1);
const req = ref("");

function decreaseQ() {
  if (quantity.value > 1) quantity.value -= 1;
}
async function getOrder() {
  const result = await api.orders.findOne(route.params.id);
  console.log(result.data[0]);
  data.value = result.data[0];
  req.value = result.data[0].request_detail;
}

function setImage(image_src) {
  return `http://localhost:8080/${image_src}`;
}

function moveList(id) {
  router.push({
    name: "orders",
  })
}

getOrder();

async function placeOrder() {
  const result = await api.orders.update(route.params.id, quantity.value, req.value, data.value.menus_id, route.params.id);
  console.log(quantity.value);
  console.log(req.value);
  alert(result.data.message);
  router.push('/orders');
}

</script>

<style lang="scss" scoped></style>