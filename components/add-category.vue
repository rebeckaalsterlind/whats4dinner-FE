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

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const isOpen = ref(true)
const categoryName = ref()

const saveCategory = (value: boolean) => {
  isOpen.value = value;
  emit('update:modelValue', categoryName.value)
}

const check = () => {
  console.log('category name in chenc', categoryName.value);
}
watch(categoryName, check)
</script>