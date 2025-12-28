<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import PokemonSearchAdvanced from '../components/PokemonSearchAdvanced.vue'


const route = useRoute()
const router = useRouter()

</script>

<template>
  <main>
    <h1>Recherche avancée</h1>
    <PokemonSearchAdvanced 
      :type1="route.query.type1 ? route.query.type1 as string : ''" 
      :type2="route.query.type2 ? route.query.type2 as string : ''"
      :generation="route.query.generation ? route.query.generation as string : ''"
      @update:type1="(input: string) => router.push({ query: { type1: input, type2: route.query.type2, generation: route.query.generation } })"
      @update:type2="(input: string) => router.push({ query: { type1: route.query.type1, type2: input, generation: route.query.generation } })"
      @update:generation="(input: string) => router.push({ query: { generation: input, type1: route.query.type1, type2: route.query.type2 } })"
    />
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  margin-bottom: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}
</style>
