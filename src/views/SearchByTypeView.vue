<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Pokemon, PokemonType } from '../types/pokemon'
import PokemonSearchByType from '../components/PokemonSearchByType.vue'
import PokemonSearchByGen from '../components/PokemonSearchByGen.vue'
import PokemonResultMultiple from '../components/PokemonResultMultiple.vue'
const route = useRoute()
const router = useRouter()


// DATA
const resultsByType = ref<Pokemon[]>([])
const resultsByGen = ref<Pokemon[]>([])


// COMPUTED
const results = computed(() => {
  const hasTypeResults = resultsByType.value && resultsByType.value.length > 0
  const hasGenResults = resultsByGen.value && resultsByGen.value.length > 0

  // Aucun résultat
  if (!hasTypeResults && !hasGenResults) {
    return []
  }

  // Uniquement résultats par type
  if (!hasGenResults) {
    return resultsByType.value
  }

  // Uniquement résultats par génération
  if (!hasTypeResults) {
    return resultsByGen.value
  }

  // Les deux ont des résultats - faire l'intersection
  const typeSet = new Set(resultsByType.value.map(p => p.id))
  return resultsByGen.value.filter(p => typeSet.has(p.id))
})


// FUNCTIONS
function handleSearchByType(result: Pokemon[]) {
  resultsByType.value = result
}

function handleSearchByGen(result: Pokemon[]) {
  resultsByGen.value = result
}

function handleTypeSelected(types: { type1: PokemonType | null; type2: PokemonType | null }) {
  if (types.type1 && types.type2) {
    router.push({ query: { type1: types.type1.name, type2: types.type2.name } })
  } else if (types.type1) {
    router.push({ query: { type: types.type1.name } })
  }
}

function handleGenerationSelected(generation: string | null) {
  if (generation) {
    router.push({ query: { generation: generation } })
  }
}
</script>

<template>
  <main>
    <h1>Recherche avancée</h1>
    
    <PokemonSearchByType 
      :type="(route.query.type as string)"
      :type1="(route.query.type1 as string)"
      :type2="(route.query.type2 as string)"
      @result="handleSearchByType"
      @type-selected="handleTypeSelected"
    />

    <PokemonSearchByGen 
      :generation="(route.query.generation as string)"
      @result="handleSearchByGen"
      @generation-selected="handleGenerationSelected"
    />

    <PokemonResultMultiple :results="results" />
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
