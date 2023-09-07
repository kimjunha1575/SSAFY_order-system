import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCommonStore = defineStore('common', () => {
  const title = ref('SSAFY-CAFE');
  function getTitle() {
    return title.value;
  }
  function changeTitle(newTitle) {
    title.value = newTitle;
  }
  return { getTitle, changeTitle };
});
