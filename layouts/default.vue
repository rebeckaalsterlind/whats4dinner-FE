<template>
  <Header
    class="fixed z-10 h-16 min-w-full flex justify-between p-3 pb-1 items-center drop-shadow-l bg-prime-normal bg-opacity-80" />
  <main class="bg-prime-normal grow mx-auto px-6 py-28 flex flex-col w-full h-full">
    <slot />
  </main>
  <Footer class="h-16 min-w-full bg-prime-normal bg-opacity-95 fixed bottom-0" />
</template>