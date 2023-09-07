
<script setup>
import { useCommonStore } from '@/stores/common';
import { ref } from 'vue';
import { api } from '@/utils/axios';
import { useRoute, useRouter } from "vue-router";

const name = ref("");
const description = ref("");
const file = ref(null);
const common = useCommonStore();
const router = useRouter();
const route = useRoute();
const menus = ref([]);

function fileChange(e) {
    console.log(e.target.files);
    file.value = e.target.files[0];
}

async function menuCreate() {
    if (!name.value || !description.value || !file.value) {
        alert("빈 값이 있습니다. 내용을 전부 작성해주세요.");
    }
    const result = await api.menus.create(
        name.value,
        description.value,
        file.value,
    );
    console.log(result);
    // 요청 성공
    if (result.data.success) {
        alert(result.data.message);
        router.push({ name: "menus" });
    }
    // 요청 실패
    if (!result.data.success) {
        alert(result.data.message);
    }
}

function setURL(file) {
    console.log(file);
    const imageURL = URL.createObjectURL(file);
    console.log(imageURL);
    return imageURL;
}

async function getMenus() {
    const result = await api.menus.findAll(route.params.id);
    menus.value = result.data;
    name.value = result.data.name;
    description.value = result.data.description;
}
getMenus();

if (route.params.id) {
    common.changeTitle("메뉴 주문하기");
    getMenus();
}

common.changeTitle("메뉴 주문하기");
</script>

<template>
    <div class="card mb-2">
        <div class="card-body">
            <h3 class="menu-name">
                주문번호: {{ 1234 }} <br>
            </h3>
            <hr>
            <div class="menus-wrapper mb-1">
                <span>메뉴</span><br>
                <select v-model="menus_id" class="form-select mt-1" aria-label="Default select example">

                    <!-- <option selected :value="data[0].menus_id">{{  data[0].name }}</option> -->
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
    <!-- <div class="form-wrapper">
        <div>
            <span>메뉴 이름: </span>
            <input type="text" v-model="name">
        </div>
    <div>
        <span>메뉴 설명: </span>
        <input type="text" v-model="description">
    </div>
    <input type="file" @change="fileChange">
    <button @click="menuCreate">메뉴 추가하기</button>
    </div>
    <div class="image-wrapper" v-if="file">
        <img class="selected-image" :src="setURL(file)">
    </div> -->
</template>


<style scoped>
.form-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    border: 1px solid black;
    padding: 20px;
}

.form-wrapper>* {
    margin: 10px;
}

.image-wrapper {
    margin-top: 30px;
    border: 1px solid black;
}

.selected-image {
    width: 100%;
}
</style>