<template>
  <Dialog :open="isOpen" @close="saveCategory" class="relative z-50">
    <div class="fixed inset-0 flex items-center justify-center p-4 bg-white bg-opacity-90">
      <DialogPanel class="content-fit p-10 rounded-lg bg-prime-normal text-white">
        <DialogTitle class="mb-2 text-accent-normal text-center">Add new category
        </DialogTitle>
        <div class="flex gap-2">
          <input v-model="categoryName" type="text" placeholder="Name.." class="text-prime-normal px-2 rounded-lg" />
          <Button label="Save" class="bg-accent-normal" @click="saveCategory(false)" />
        </div>
        <p @click="isOpen = false" class="cursor-pointer hover:text-accent-normal text-sm pt-2">Cancel</p>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { checkLogin, generateId } from '~~/helpers.js';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);
const isOpen = ref(true);
const categoryName = ref();

const saveCategory = async (value: boolean) => {
  isOpen.value = value;
  if (categoryName.value.length > 0) {
    const newCategory = { categoryId: generateId(), name: categoryName.value };
    const userInLS = localStorage.getItem('user');

    if (userInLS) {
      const LSuser = JSON.parse(userInLS)
      try {
        const { data, error } = await useFetch('https://whats4dinner-be.herokuapp.com/categories/addCategory', {
          headers: { "Content-type": "application/json" },
          method: 'POST',
          body: { id: LSuser._id, category: newCategory }
        });
        localStorage.setItem('user', JSON.stringify(data.value));
        checkLogin();
        emit('update:modelValue', newCategory)
      } catch (error) {
        console.log('error', error);
      }
    }
  }
};

</script>