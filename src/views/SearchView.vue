<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Pokemon } from '../types/pokemon'
import SearchSimple from '../components/SearchSimple.vue'
import ResultSimple from '../components/ResultSimple.vue'

const route = useRoute()
const router = useRouter()
const result = ref<Pokemon | null>(null)
const error = ref('')

onMounted(() => {
  const id = route.query.id as string
  const name = route.query.name as string

  if (id || name) {
    handleSearch(null)
  }
})

function handleSearch(pokemon: Pokemon | null) {
  result.value = pokemon
  
  // Mettre à jour la route basée sur les résultats
  if (pokemon && pokemon.id) {
    router.push({ query: { id: pokemon.id } })
    error.value = ''
  }
}

function handleError(errorMsg: string) {
  error.value = errorMsg
}
</script>

<template>
  <main>
    <h1>Recherche Pokémon</h1>
    <SearchSimple 
      :id="(route.query.id as string)" 
      :name="(route.query.name as string)"
      @result="handleSearch"
      @error="handleError"
    />

    <ResultSimple :result="result" :error="error" />
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