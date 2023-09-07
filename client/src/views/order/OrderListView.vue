<template>
    <div>
        <RouterLink :to="{name: 'order-menus'}">
            <button type="button" class="order-button mt-3 btn btn-outline-dark w-100 mb-2">
                주문 목록으로
            </button>
        </RouterLink>
        <ul>
            <li @click="moveDetail(order.id)" v-for="order in orders" :key="order.id">
                <div class="menu-container">
                    <div class="menu-info-wrapper">
                        <h2 class="menu-name">
                            주문번호 : {{ order.id }} <br>
                            메뉴 : {{ order.name }}
                        </h2>
                        <p class="menu-description">
                            주문 수량 : {{ order.quantity }}개 <br>
                            요구 사항 : {{ order.request_detail }}
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useCommonStore } from "@/stores/common";
import { api } from "@/utils/axios";
import { useRouter } from "vue-router";

const common = useCommonStore();
common.changeTitle("주문 내역");

const orders = ref([]);
const menus = ref([]);
const router = useRouter();

async function getOrders(){
    const result = await api.order.findAll();
    console.log(result.data)
    orders.value = result.data;
}

getOrders();

function moveDetail(id){
    router.push(`/order/list/${id}`);
}
</script>

<style lang="scss" scoped>

</style>