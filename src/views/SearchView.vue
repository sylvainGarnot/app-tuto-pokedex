<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Pokemon } from '../types/pokemon'
import PokemonSearch from '../components/PokemonSearch.vue'
import PokemonResultSimple from '../components/PokemonResultSimple.vue'

const route = useRoute()
const router = useRouter()
const result = ref<Pokemon | null>(null)

onMounted(() => {
  const id = route.query.id as string
  const name = route.query.name as string

  if (id || name) {
    handleSearch(null)
  }
})

function handleSearch(pokemon: Pokemon | null) {
  result.value = pokemon
  
  if (pokemon && pokemon.id) {
    router.push({ query: { id: pokemon.id } })
  }
}
</script>

<template>
  <main>
    <h1>Recherche Pokémon</h1>
    <PokemonSearch 
      :id="(route.query.id as string)" 
      :name="(route.query.name as string)"
      @result="handleSearch"
    />

    <PokemonResultSimple :result="result" />
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