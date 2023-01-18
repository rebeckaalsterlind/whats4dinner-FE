<template>
  <article>
    <Carousel :category="favourites" label="Favourites" />
    <Carousel :category="quick" label="Quick" />
    <Carousel :category="comfort" label="Comfort" />
    <Carousel :category="favourites" label="Favourites" />
  </article>

</template>

<script setup lang="ts">

const favourites = [
  { name: 'Pasta bolognese', id: 1, img: '@/assets/img/bolognese.jpg' },
  { name: 'Pizza', id: 2, img: '@/assets/img/pizza.jpg' },
  { name: 'Fish & chips', id: 3 },
  { name: 'Chicken', id: 4 },
  { name: 'Stirfry', id: 5 },
  { name: 'Taco', id: 6 },
  { name: 'Sunday roast', id: 7 },
  { name: 'Pancakes', id: 8 },
];

const comfort = [
  { name: 'Pasta bolognese', id: 1, img: '@/assets/img/bolognese.jpg' },
  { name: 'Pizza', id: 2, img: '@/assets/img/pizza.jpg' },
  { name: 'Fish & chips', id: 3 },
  { name: 'Chicken', id: 4 },
  { name: 'Stirfry', id: 5 },
  { name: 'Taco', id: 6 },
  { name: 'Sunday roast', id: 7 },
  { name: 'Pancakes', id: 8 },
]

const quick = [
  { name: 'Pasta bolognese', id: 1, img: '@/assets/img/bolognese.jpg' },
  { name: 'Pizza', id: 2, img: '@/assets/img/pizza.jpg' },
  { name: 'Fish & chips', id: 3 },
  { name: 'Chicken', id: 4 },
  { name: 'Stirfry', id: 5 },
  { name: 'Taco', id: 6 },
  { name: 'Sunday roast', id: 7 },
  { name: 'Pancakes', id: 8 },
]
</script>
