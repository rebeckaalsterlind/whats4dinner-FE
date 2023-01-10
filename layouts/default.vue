<template>
  <Header class="h-16 min-w-full flex justify-between p-3 items-end drop-shadow-md bg-white shadow-slate-600" />
  <main class="grow flex flex-col mx-10 pt-10">
    <slot />
  </main>
  <Footer class="h-16 min-w-full bg-slate-300" />
</template>
