<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Pokemon, PokemonType } from '../types/pokemon'
import SearchByType from '../components/SearchByType.vue'
import ResultsMultiple from '../components/ResultsMultiple.vue'

const route = useRoute()
const router = useRouter()
const results = ref<Pokemon[]>([])

function handleSearch(results_data: Pokemon[]) {
  results.value = results_data
}


function handleTypeSelected(types: { type1: PokemonType | null; type2: PokemonType | null }) {
  if (types.type1 && types.type2) {
    router.push({ query: { type1: types.type1.name, type2: types.type2.name } })
  } else if (types.type1) {
    router.push({ query: { type: types.type1.name } })
  }
}
</script>

<template>
  <main>
    <h1>Recherche avancée</h1>
    <SearchByType 
      :type="(route.query.type as string)"
      :type1="(route.query.type1 as string)"
      :type2="(route.query.type2 as string)"
      @result="handleSearch"
      @type-selected="handleTypeSelected"
    />

    <ResultsMultiple :results="results" />
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}
</style>
