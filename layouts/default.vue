<template>
  <Header
    class="fixed z-10 h-16 min-w-full flex justify-between p-3 pb-1 items-center drop-shadow-l bg-prime-normal bg-opacity-80" />
  <main class="bg-prime-normal grow flex flex-col justify-start mx-6 my-16 pt-8 max-w-full overflow-x-hidden">
    <slot />
  </main>
  <Footer class="h-16 min-w-full bg-prime-normal bg-opacity-95 fixed bottom-0" />
</template>
