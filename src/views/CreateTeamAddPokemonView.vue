<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTeamStore } from '../stores/teamStore'
import PokemonTeamUpdate from '../components/PokemonTeamUpdate.vue'
import type { Pokemon } from '../types/pokemon'

const router = useRouter()
const teamStore = useTeamStore()

// DATA & STORE
const currentTeam = computed(() => teamStore.currentTeam)

// FUNCTIONS
function addPokemonToTeam(pokemon: Pokemon) {
  teamStore.addCurrentTeamPokemon(pokemon)
}

function removePokemon(pokemonId: number) {
  teamStore.removeCurrentTeamPokemon(pokemonId)
}

async function saveTeam() {
  if (!currentTeam.value) return
  
  try {
    await teamStore.apiPostTeam(currentTeam.value)
    router.push({ name: 'home' })
  } catch {
    // Gérer l'erreur de sauvegarde
  } finally {
    // loading state if needed
  }
}
</script>

<template>
  <main>
    <PokemonTeamUpdate
      v-if="currentTeam"
      :team="currentTeam"
      @remove="removePokemon"
      @addPokemon="addPokemonToTeam"
    />

    <button 
      v-if="currentTeam"
      @click="saveTeam" 
      class="save-team-button"
    >
      Sauvegarder l'équipe
    </button>
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  padding-bottom: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.save-team-button {
  padding: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  width: fit-content;
  align-self: flex-end;
}

.save-team-button:hover:not(:disabled) {
  background-color: #369970;
}

</style>
