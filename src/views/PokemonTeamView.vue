<script setup lang="ts">
import { useRoute } from 'vue-router'
import PokemonTeamDetail from '../components/PokemonTeamDetail.vue'
import AppButtonBack from '@/layout/AppButtonBack.vue'

const route = useRoute()

</script>

<template>
  <main>
    <AppButtonBack />
    <PokemonTeamDetail
      v-if="route.params.id" 
      :id="(route.params.id as string)"
    />
  </main>
</template>

<style scoped>
</style>
