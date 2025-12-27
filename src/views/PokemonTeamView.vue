<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useTeamStore } from '../stores/teamStore'
import type { PokemonTeam } from '../types/pokemon'
import PokemonTeamUpdate from '../components/PokemonTeamUpdate.vue'

const route = useRoute()
const teamStore = useTeamStore()
const team = ref<PokemonTeam | null>(null)

onMounted(() => {
  const teamId = route.params.id as string
  
  const foundTeam = teamStore.teams.find(t => t.id === teamId)
  if (foundTeam) {
    team.value = foundTeam
  }
})
</script>

<template>
  <main>
    <PokemonTeamUpdate v-if="team" :team="team"  />
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
}

.loading {
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  padding: 2rem;
}
</style>
