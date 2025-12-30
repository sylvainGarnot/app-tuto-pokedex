<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import AppButtonBack from '@/layout/AppButtonBack.vue'
import PokemonSearchSimple from '../components/PokemonSearchSimple.vue'

const route = useRoute()
const router = useRouter()

</script>

<template>
  <main>
    <AppButtonBack />
    <h1>Recherche Pokémon</h1>
    <PokemonSearchSimple 
      :id="(route.query.id as string)" 
      :name="(route.query.name as string)"
      @update:name="(input: string) => router.push({ query: { name: input } })"
    />
  </main>
</template>

<style scoped>
</style>