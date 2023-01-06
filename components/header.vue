<template>
  <header class="flex justify-between p-3 items-end">
    <h1 @click="() => { navigateTo('/') }">
      whats4dinner?
    </h1>
    <aside @click="() => { navigateTo('/my-account') }">Account</aside>
  </header>
</template>