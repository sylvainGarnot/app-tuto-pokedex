<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import PokemonSearchSimple from '../components/PokemonSearchSimple.vue'

const route = useRoute()
const router = useRouter()

</script>

<template>
  <main>
    <h1>Recherche Pokémon</h1>
    <PokemonSearchSimple 
      :id="(route.query.id as string)" 
      :name="(route.query.name as string)"
      @update:name="(input: string) => router.push({ query: { name: input } })"
    />
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}
</style>