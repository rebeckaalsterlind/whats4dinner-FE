<template>
  <main>

    <SearchBar v-model="max" label="Search meal.." />
    <section class="my-6 drop-shadow-md bg-white h-60">
      Result
    </section>
  </main>
</template>

<script>
const max = ref('');
</script>