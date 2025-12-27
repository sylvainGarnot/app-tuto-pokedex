<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useTeamStore } from '../stores/teamStore'
import type { PokemonTeam } from '../types/pokemon'
import PokemonTeamUpdate from '../components/PokemonTeamUpdate.vue'

const route = useRoute()
const router = useRouter()
const teamStore = useTeamStore()
const team = ref<PokemonTeam | null>(null)

onMounted(() => {
  const teamId = route.params.id as string
  
  const foundTeam = teamStore.teams.find(t => t.id === teamId)
  if (foundTeam) {
    team.value = foundTeam
  }
})

async function handleDeleteTeam() {
  try {
    await teamStore.apiDeleteTeam(team.value!.id)
    router.push({ name: 'home' })
  } catch {
    alert('Erreur lors de la suppression de l\'équipe')
  }
}
</script>

<template>
  <main>
    <PokemonTeamUpdate 
      v-if="team" 
      :team="team"
    />
    <button @click="handleDeleteTeam" class="delete-button" title="Supprimer cette équipe">🗑️</button>

  </main>
</template>

<style scoped>
main {
  padding: 2rem;
}

.delete-button {
  margin: 50px auto;
  padding: 0.75rem 1rem;
  background-color: #fee;
  color: #c33;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;
  white-space: nowrap;
  min-width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-button:hover {
  background-color: #fcc;
  border-color: #c33;
}
</style>
