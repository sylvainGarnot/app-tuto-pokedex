<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppButtonBack from '@/layout/AppButtonBack.vue'
import PokemonDetail from '../components/PokemonDetail.vue'

const route = useRoute()

</script>

<template>
  <main>
    <AppButtonBack />
    <PokemonDetail :id="(route.params.id as string)" />
  </main>
</template>

<style scoped>
</style>
