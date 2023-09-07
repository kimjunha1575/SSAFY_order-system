<template>
    <div class="card mb-2">
        <div class="card-body">
            <h3 class="menu-name">
                주문번호: {{ data[0].id }} <br>
            </h3>
            <hr>
            <div class="menus-wrapper mb-1">
                <span>메뉴</span><br>
                <select v-model="menus_id" class="form-select mt-1" aria-label="Default select example">
                    <option selected :value="data[0].menus_id">{{ data[0].name }}</option>
                    <option v-for="menu in menus" :key="menu.id" :value="menu.id">{{ menu.name }}</option>
                </select>
            </div>
            <div class="quantity-wrapper mt-3">
                <span>주문 수량 수정</span>

                <div class="input-group mt-1 w-50">
                    <button @click="decreaseQ" class="btn btn-outline-secondary" type="button">-</button>
                    <span type="number" class="form-control text-center" aria-label="Example text with two button addons">{{
                        quantity }}</span>
                    <button @click="quantity++" class="btn btn-outline-secondary" type="button">+</button>
                </div>
            </div>
            <div class="req-wrapper mt-3">
                <span>요구 사항 수정</span>
                <div class="input-group mt-1">
                    <textarea v-model="req" class="form-control" aria-label="With textarea">{{ req }}</textarea>
                </div>
                <br>
                <div class="buton-wrapper">
                    <button @click="updateOrder" type="button" class="btn btn-primary">수정하기</button><br>
                    <button @click="deleteOrder" type="button" class="btn btn-danger">삭제하기</button><br>
                    <button type="button" class="btn btn-outline-primary ml-1" @click="moveList">뒤로가기</button>
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
const data = ref("");
const menus = ref([]);
const quantity = ref(0);
const req = ref("");
const menus_id = ref(0);

function decreaseQ() {
    if (quantity.value > 1) quantity.value -= 1;
}

async function getMenu1() {
    const result = await api.order.findOne(route.params.id);
    data.value = result.data;
    quantity.value = result.data[0].quantity;
    req.value = result.data[0].request_datail;
    console.log(result.data);
    menus_id.value = result.data[0].menus_id;
};
getMenu1();

async function getMenu2() {
    const result = await api.menus.findAll();
    menus.value = result.data();
    console.log('-------------------');
    console.log(result.data);
};
getMenu2();

async function updateOrder() {
    console.log(quantity.value, req.value, menus_id.value)
    const result = await api.order.update(quantity.value, req.value, menus_id.value, route.params.id);
    alert(result.data.message);
    router.push('/order/list');
};

async function deleteOrder() {
    const result = await api.order.delete(route.params.id);
    alert(result.data.message);
    router.push('/order/list')
};

function moveList() {
    router.push('/order/list');
};

</script>

<style lang="scss" scoped></style>