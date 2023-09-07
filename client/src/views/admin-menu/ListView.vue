<template>
    <ul>
        <li v-for="menu in menus" :key="menu.id" @click="moveDetail(menu.id)">
            <div class="menu-container">
                <div class="menu-image" :style="`background-image: url(${getImageURL(menu.image_src)})`"></div>
                <div class="menu-info-wrapper">
                    <h2 class="menu-name">{{ menu.name }}</h2>
                    <p class="menu-description">{{ menu.description }}</p>
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
        name: "menus-detail",
        params: { id: id },
    })
}

const common = useCommonStore();
const menus = ref([]);

async function getMenus() {
    const result = await api.menus.findAll();
    // console.log(result);
    menus.value = result.data;
}

function getImageURL(image_src) {
    // console.log(process.env.VUE_APP_API_URL);
    return `${import.meta.env.VITE_API_URL}/${image_src}`;
}

common.changeTitle('메뉴 목록');
getMenus();
</script>
<style scoped>
.menu-container {
    display: flex;
    align-items: center;
    border-bottom: 3px solid black;
}

.menu-info-wrapper {
    margin: 0 auto;
    text-align: center;
}

.menu-name {
    font-size: 25px;
    font-weight: bold;
}

.menu-description {
    padding-top: 10px;
}

.menu-image {
    background-size: cover;
    background-position: center;
    width: 180px;
    height: 180px;
}
</style>