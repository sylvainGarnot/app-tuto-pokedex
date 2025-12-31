<script setup lang="ts">
import { useRoute } from 'vue-router'
import PokemonTeamUpdate from '@/components/PokemonTeamUpdate.vue'

const route = useRoute()

</script>

<template>
  <main>
    <PokemonTeamUpdate v-if="route.params.id" :id="(route.params.id as string)" />
  </main>
</template>

<style scoped>
</style>
