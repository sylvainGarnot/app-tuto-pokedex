<script setup lang="ts">
import PokemonTeamUpdateName from '@/components/PokemonTeamUpdateName.vue'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useTeamStore } from '@/stores/teamStore'

const router = useRouter()
const teamStore = useTeamStore()


onMounted(() => {
  teamStore.clearCurrentTeam()
})
</script>

<template>
  <main>
    <PokemonTeamUpdateName @team-created="router.push({ name: 'createTeamAddPokemon' })" :button-text="'Étape suivante'" />
    
  </main>
</template>

<style scoped>
</style>
