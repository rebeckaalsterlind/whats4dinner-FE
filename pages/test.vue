<template>
  <article class="fit-content min-h-[250px]">

    <div class="mt-4 flex items-center">
      <PhotoIcon class="w-6 h-6 cursor-pointer" />
      <PlusIcon class="w-4 h-4" />

      <input id="file" type="file" name="image" @change="onFileSelected" required>
      <button @click="onUpload">Upload</button>
    </div>

  </article>
</template>

<script setup >
import { PhotoIcon, PlusIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { checkLogin, capitalize, generateId } from '@/helpers.vue';
import { userStore } from '~~/stores/userStore';
import { storeToRefs } from 'pinia';
import axios from 'axios';
const store = userStore();
const { user, userCategories, userRecipes, selectedMeal } = storeToRefs(store);

const selectedFile = ref()

const onFileSelected = (e) => {


  selectedFile.value = e.target.files[0]

  console.log('selectedfile', selectedFile.value);

}

const onUpload = () => {
  console.log('selectedFile', selectedFile.value);
  const fd = new FormData();
  fd.append('image', selectedFile.value, selectedFile.value.name + '.jpg')

  console.log('after', fd);


  axios.post('http://localhost:3030/images/saveImage', fd)
    .then(res => {
      console.log('res', res.data)
    })
  // fetch("http://localhost:3030/images/saveImage", {
  //   method: 'POST',
  //   body: fd,
  //   headers: {
  //     "Content-Type": "multipart/form-data"
  //   }
  // })
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log("Error occured", err));



}
</script>