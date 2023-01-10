<template>
  <main class="col-start-2 col-span-3">

    <SearchBar v-model="max" label="Search meal.." />
    <Disclosure label="Advanced Search">
      <DisclosureContent label="Advanced search goes here!" />
    </Disclosure>
    <section class="my-6 drop-shadow-md bg-white h-60">
      Result
    </section>
  </main>
</template>

<script>
const max = ref('');
</script>