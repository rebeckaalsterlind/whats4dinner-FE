<template>
  <PageTitle label="Meal suggestions" />
  <article class="grow flex flex-col justify-center items-center gap-4">
    <ButtonSecondary label="From my saved meals" @click="() => navigateTo('/generate-meals')" />
    <ButtonSecondary label="Based on what is in my fridge" @click="() => navigateTo('/what-is-in-my-fridge')" />
  </article>
</template>



