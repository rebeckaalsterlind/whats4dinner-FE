<template>
  <Header
    class="fixed z-10 h-16 min-w-full flex justify-between p-3 items-end drop-shadow-lg bg-white shadow-slate-600" />
  <main class="grow flex flex-col mx-6 my-16 pt-8">
    <slot />
  </main>
  <Footer class="h-16 min-w-full bg-slate-400 fixed bottom-0" />
</template>
