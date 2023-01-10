<template>
  <div class="bg-white p-2 drop-shadow-sm">
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="flex w-full justify-between rounded px-4 py-2 text-left text-sm font-medium text-slate-600 hover:bg-slate-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
        <span>{{ label }}</span>
        <ChevronUpIcon :class="open ? '' : 'rotate-180 transform'" class="h-5 w-5 text-slate-500" />
      </DisclosureButton>
      <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
        <Slot />
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronUpIcon } from '@heroicons/vue/20/solid';

interface IDisclosure {
  label: string
}

defineProps<IDisclosure>()

</script>
