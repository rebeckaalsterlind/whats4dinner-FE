<template>
  <article v-if="userList.length > 0">
    <h4 class="ml-1 text-white font-semibold">My generated list</h4>
    <Carousel :items-to-scroll="1" :wrap-around="true" :settings="settings"
      class="flex flex-col justify-items-stretch mb-8">
      <Slide v-for="slide of userList" :key="slide.id" class="h-36 pb-2 px-1 cursor-pointer">
        <article @click="goToMeal(slide)" class="w-full h-full flex rounded-lg overflow-hidden drop-shadow-lg">
          <img src="https://spoonacular.com/cdn/ingredients_100x100/pasta.jpg" :alt="slide.title"
            class="grow object-cover " />
          <h6
            class="absolute flex items-center px-2 overflow-hidden break-all bottom-0 w-full text-xs font-light text-white h-[18%] bg-prime-normal bg-opacity-80">
            {{ slide.title }}
          </h6>
        </article>
      </Slide>
    </Carousel>
  </article>
  <article v-if="filteredCategories.length > 0">
    <h4 class="ml-1 text-white font-semibold">{{ category.name }}</h4>
    <Carousel :items-to-scroll="1" :wrap-around="true" :settings="settings"
      class="flex flex-col justify-items-stretch mb-8">
      <Slide v-for="slide of filteredCategories" :key="slide.id" class="h-36 pb-2 px-1 cursor-pointer">
        <article @click="goToMeal(slide)" class="w-full h-full flex rounded-lg overflow-hidden drop-shadow-lg">
          <img :src="burger" :alt="slide.title" class="grow object-cover " />
          <h6
            class="absolute flex items-center px-2 overflow-hidden break-all bottom-0 w-full text-xs font-light text-white h-[18%] bg-prime-normal bg-opacity-80">
            {{ slide.title }}
          </h6>
        </article>
      </Slide>
    </Carousel>
  </article>

</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { reactive } from '@vue/runtime-core';
import { storeToRefs } from 'pinia';
import { userStore } from '~~/stores/userStore';
import { IRecipes } from '~~/domain/types';
const store = userStore();
const { userRecipes, selectedMeal, userList } = storeToRefs(store);
const ramen = 'https://ffc00556bb606c8ba2c6803db94de5b5aad79b8579491d37c323d98-apidata.googleusercontent.com/download/storage/v1/b/whats4dinner/o/ramen.jpg?jk=AahUMlvUBgJ5017U4n6csRKXHjxjPICXJm2j17XPPBrndfHjwjh3nRoutd9eqB7-i6pg2edxO1yTLc3UubEQqGsT1VkRjHUJnZqQHYOfXIEo_CEk8_Uz4kvNIrFGDkbQW9spyw_tC4Truf4xTWvij4BUsIJcJ-RyIkdLEkC2GlHrvwnQ9LsDBSqERE7D5i3OfUP1Ujy45iL06EQcRnj0A-HRH0vXDAEpPcwrUy85nrKQXhMQzrAqajP0Q1TKkeQVo1dLbV_p6MiJ5knPnvpeELgiHuSnxRXDwdoe0_h0kfuxXa8j2JuN66MOPDec4B8UMUj7jRExAkeKbP7agnZyTvekmfMhIjp755EQSXC_hwO_dCMrgU6IIGQIDGa2079TxbzuziYqU9m33ywtQuAB_UnnrThRjVbLPq0phDs56oKMMpCAOQNIU_7bimvVZ-uqfeerh5fM-ZhI2WSSWXnW9pV1VNbWb7vzJGsYtgcVHeqGfGUyJQ2seHgiYuJO235t0fg4C1AEOlqaAvT8Xh7NMoRYmy2orlA0VF234NHisWLhB-5R0UBc5RqBxylARCfP1hQatlYRzgYjbMBb-uFxAc2hPNAeQTk8h7eExD7htEmO4Ar1-npYbvvyZ1vmoj7lwzYOCdmtDBaJT9KtCTutAiODJmIGZIqLi-VvqFa3PB7xnKuM9q4ayCmfh4XqM1C9H3NFmT0BjK_Gon_eVDoQrAE88QoNnVhsG1OyyCrPU73m2vy5Gu6WoUU_sWw-lSX5wsC_SNFmeQdwqZqQGMlPCD2wGPQzYvl8TtfxsznLfRAYvrLVOvQ3UR9YAALHUxpHxEPnv0mdDvyUuYKX7CPXTGo_yX7NF2OL0tstHlJY9X6wb0AyxEHzDdcd2Yvosp53WWF3qaSLslAVXso280mQw1qljQ8Ku4O24q7m3qHYkmupsXBrxHNqbefl2MoqY0gAKcTT6hqlmo3CLtxRQIETIfViMhx6Vy4jL8PZphTbqgt3nGDpYqdgGYKo9fZCUTpJJvoOiRJZ9RjxUWfyya8-uw06M6gqggOnZaV8iDHR_tBT30O94pbZJH2x_Hir6h3jGm8lJ5GrIs11R6t_m-wNFgWnNXxP0EfMsK12_hBHwsqCljSYltKUGSG8Bxrj5IGfzWAioHkxGXLI3PVD8g&isca=1';
const burger = 'https://ffbde22e64accf7ab985082f30befeaba91908aa09ac6cdfd2aae8b-apidata.googleusercontent.com/download/storage/v1/b/whats4dinner/o/burger.jpg?jk=AahUMlsFbsGCVLXCkSMfgbd2fDfcszLWozLXgHVdbxMLN6EXgXf-hqWVbWmj9Fwj2P4wU1iJdNbP86RElFDiizkQ93EdnFm-_iFqnOaFNbaaVQRTrvi48GJ-XINT7zIa5iXL6yTQ2LlT0eeDCrKcq8yMsit7YXL_nAnK4l4veTThxG_TnU5sIjVJQRhB8vh7HFvA7N1XQrv7gnAXUAkXxTTDu9U-oRG49QGKKHHnsaaby3DwgK5WV3LFNJcFcoZonIY8mDDta0ZKGxThymDzSeNmji0od7Ajr0mvBoUEYbAOTtIEj240IFxQKOGy-luQL1l5M0qicAV0q4iDix50qI1gal48MacYTKeZHcCuih1c0iAexhn6rJOXHLHAXZskB9a04IVXQ_kaZfhzXnBvlZIXG8vaaSbA9SwnNGMr66vPy7OIHvCC8QPpjRsPrPPHvDCJS4pTgqSyaa7QcCKUOHUTSQ9vHNkyNfEM_IkEIzeptRRPwduZJA6BZ-IH2XzVdPLoW61c_AXQ22a4ZQlUVwHgvzVVGEbkssSbqs1FUwjQPIhXJMyOAmHDWBA0UY__z8VwZZaP92cweaC6RGTmmgCr7XXZf847FKQLEuwq6xRdCB36dfBSbrIS766wZWSGbFJWG0e1ROTxc4t3peh8VTR5sTUJQnV5LoYcX4sp0M32DH-6C9EICxPZJmEiZLXwnBVOIGPi461gTsyyEBgXMZG4bVtlTX0DchlJeCPefGJRNShodOKvm3CD5kd8uwqE59EJSxcj6AU0CIIiDvKUeTKrSjNKB-J2_Udy6sc4Fesd5QyaNS7R44U84dYrGWcnZjlXYrmIG0b676RHdQk44tEVGTG2ro7mOMcddkbW5NGo0wFjFVrjfpjnIZzaYUnvKFidmZIAgVf_O9moUhA6bcWV7OdBULgf9HfPiATqo_B8IKiOq2dwmT33C-U5MW1QPV1vLyUKU1OeidUDgTRNBj7m5m3kALxFYs5Mj0xtxd4sL0kbo8uh8cZU-6a8BrzGO7SgLsIVXXqtC3F9aZBWzR2wwaZLxdMlyI-1vQIfbwksMecKaGLwPYM47nR74gwP_wlImkdrvJNV1ebA5EiyJIY5J4d35pCcivEFdfjPTdANIb67of36Y4zQSBmXVAlcQfYlGiTODHTZTGjW-3o&isca=1'
const settings = {
  itemsToShow: 3,
  snapAlign: 'start',
};

interface ICarousel {
  category: { name: string, categoryId: number }
}
const { category } = defineProps<ICarousel>();
const filteredCategories = reactive([] as IRecipes[]);
const setMeal = ref();

const goToMeal = (meal: IRecipes) => {
  setMeal.value = meal;
  selectedMeal.value = setMeal.value;
  navigateTo("/show-meal");
}

const printRecipes = () => {
  const mealsInCategory = [] as IRecipes[]
  for (const recipe of userRecipes.value) {
    for (const cat of recipe.categories) {
      if (cat.categoryId === category.categoryId) mealsInCategory.push(recipe)
    }
  }

  Object.assign(filteredCategories, mealsInCategory);
}

watch(category, printRecipes)

onMounted(() => {
  printRecipes();
});
</script>
