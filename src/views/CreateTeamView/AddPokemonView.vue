<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTeamStore } from '@/stores/teamStore'
import PokemonSearchSimple from '@/components/PokemonSearchSimple.vue'
import PokemonSearchSimpleResult from '@/components/PokemonSearchSimpleResult.vue'
import type { Pokemon } from '@/types/pokemon'

const router = useRouter()
const teamStore = useTeamStore()

// DATA & STORE
const currentTeam = computed(() => teamStore.currentTeam)
const searchResult = ref<Pokemon | null>(null)
const alertMessage = ref('')

// FUNCTIONS
function handleSearchResult(result: Pokemon | null) {
  searchResult.value = result
  alertMessage.value = ''
}

function addPokemonToTeam() {
  if (!searchResult.value || !currentTeam.value) return

  if (currentTeam.value.pokemons.length >= 6) {
    alertMessage.value = 'Équipe complète (6 Pokémons max)'
    return
  }

  if (currentTeam.value.pokemons.some(p => p.id === searchResult.value?.id)) {
    alertMessage.value = 'Ce Pokémon est déjà dans l\'équipe'
    return
  }

  teamStore.addCurrentTeamPokemon(searchResult.value)
  alertMessage.value = `${searchResult.value.name} ajouté à l'équipe!`
  searchResult.value = null
  setTimeout(() => {
    alertMessage.value = ''
  }, 2500)
}

function removePokemon(pokemonId: number) {
  teamStore.removeCurrentTeamPokemon(pokemonId)
}
</script>

<template>
  <main v-if="currentTeam">
    <div class="add-pokemon-container">

      <!-- Section recherche -->
      <div class="search-section">
        <h2>Ajouter un Pokémon</h2>
        <PokemonSearchSimple @update:result="handleSearchResult" />
        <div v-if="alertMessage" class="alert-message" :class="{ success: alertMessage.includes('ajouté') }">
          {{ alertMessage }}
        </div>
        <div v-if="searchResult" class="search-result-wrapper">
          <button @click="addPokemonToTeam" class="btn-primary">
            Ajouter
          </button>
        </div>
      </div>

      <!-- Section équipe actuelle -->
      <div class="team-section">
        <h2>Mon équipe ({{ currentTeam.pokemons.length }}/6)</h2>
        
        <div class="pokemons-container">
          <div v-if="currentTeam.pokemons.length === 0" class="empty-message">
            Aucun Pokémon dans l'équipe
          </div>

          <div v-for="pokemon in currentTeam.pokemons" :key="pokemon.id" class="pokemon-item">
            <PokemonSearchSimpleResult :pokemon="pokemon" />
            <button @click="removePokemon(pokemon.id)" class="remove-button">
              ✕ Retirer
            </button>
          </div>
        </div>
      </div>
    </div>

    <button 
      @click="router.push({ name: 'createTeamResume' })" 
      class="btn-primary"
      :disabled="currentTeam.pokemons.length === 0"
    >
      Étape suivante
    </button>
  </main>
</template>

<style scoped lang="scss">
main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  padding-bottom: 4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.add-pokemon-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
}

.search-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  min-width: 0;

  h2 {
    margin: 0 0 1rem 0;
    color: #333;
    font-size: 1.25rem;
    border-bottom: 2px solid #42b983;
    padding-bottom: 0.5rem;
  }
}

.alert-message {
  padding: 1rem;
  border-radius: 8px;
  background-color: #fee;
  color: #c33;
  font-weight: 500;

  &.success {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
}

.search-result-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-end;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

:deep(.search-result-wrapper .result) {
  flex: 1;
  margin-top: 0;
  margin-bottom: 0;
  min-width: 200px;
}

.team-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  min-width: 0;

  h2 {
    margin: 0 0 1.5rem 0;
    color: #333;
    font-size: 1.25rem;
    border-bottom: 2px solid #42b983;
    padding-bottom: 0.5rem;
  }
}

.pokemons-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-message {
  text-align: center;
  color: #999;
  padding: 2rem 1rem;
  font-size: 0.95rem;
}

.pokemon-item {
  display: flex;
  gap: 1rem;
  align-items: center;
}

:deep(.pokemon-item .result) {
  flex: 1;
  margin-top: 0;
  margin-bottom: 0;
}

.remove-button {
  padding: 0.5rem 1rem;
  background-color: #fee;
  color: #c33;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    background-color: #fcc;
    border-color: #c33;
  }
}

@media (max-width: 900px) {
  .add-pokemon-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  main {
    padding: 1rem;
  }

  .search-result-wrapper {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-primary {
    width: 100%;
  }

  .pokemon-item {
    flex-direction: column;
    align-items: stretch;
  }

  .remove-button {
    width: 100%;
  }
}
</style>
