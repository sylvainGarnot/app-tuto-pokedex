<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTeamStore } from '../stores/teamStore'
import { formatDate } from '../utils/dateFormatter'
import SearchSimple from '../components/SearchSimple.vue'
import ResultSimple from '../components/ResultSimple.vue'
import PokemonTeam from '../components/PokemonTeam.vue'
import type { Pokemon } from '../types/pokemon'


// DATA & STORE
const teamStore = useTeamStore()
const team = computed(() => teamStore.currentTeam)
const searchResult = ref<Pokemon | null>(null)
const alertMessage = ref('')


// FUNCTIONS
function handleSearchResult(result: Pokemon | null) {
  searchResult.value = result
  alertMessage.value = ''
}

function addPokemonToTeam() {
  if (!searchResult.value || !team.value) return

  if (team.value.pokemons.length >= 6) {
    alertMessage.value = 'Équipe complète (6 Pokémons max)'
    return
  }

  if (team.value.pokemons.some(p => p.id === searchResult.value.id)) {
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
  <main>
    <h1 v-if="team">Ajouter des Pokémons à {{ team.name }}</h1>

    <div class="team-info" v-if="team">
      <p><strong>Nom :</strong> {{ team.name }}</p>
      <p v-if="team.subname"><strong>Sous-titre :</strong> {{ team.subname }}</p>
      <p><strong>Créée le :</strong> {{ formatDate(team.createdAt) }}</p>
    </div>

    <div class="content">
      <div class="search-section">
        <SearchSimple @result="handleSearchResult" />
        
        <div v-if="alertMessage" class="success-message">{{ alertMessage }}</div>
        <div v-if="searchResult">
          
          <ResultSimple :result="searchResult" />
          
          <br>
          <br>
          <button @click="addPokemonToTeam" class="add-button">
            Ajouter à l'équipe
          </button>
        </div>
      </div>

      <PokemonTeam :pokemons="team?.pokemons ?? []" @remove="removePokemon" />
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.team-info {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.team-info p {
  margin: 0.75rem 0;
  color: #333;
  font-size: 1rem;
}

.team-info strong {
  color: #666;
  font-weight: 600;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.search-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.success-message {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
}

.add-button {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-button:hover {
  background-color: #369970;
}

@media (max-width: 900px) {
  .content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  main {
    padding: 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>
