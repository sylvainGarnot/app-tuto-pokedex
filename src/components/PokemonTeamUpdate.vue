<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from '../utils/dateFormatter'
import type { Pokemon, PokemonTeam } from '../types/pokemon'
import PokemonSearch from './PokemonSearchSimpleSearch.vue'
import PokemonResultSimple from './PokemonSearchSimpleResult.vue'


// PROPS
const props = defineProps<{
  team: PokemonTeam
  maxPokemons?: number
}>()


// EMITS
const emit = defineEmits<{
  addPokemon: [pokemon: Pokemon]
  remove: [pokemonId: number]
}>()


// DATA
const searchResult = ref<Pokemon | null>(null)
const alertMessage = ref('')


// FUNCTIONS
function handleSearchResult(result: Pokemon | null) {
  searchResult.value = result
  alertMessage.value = ''
}

function addPokemonToTeam() {
  if (!searchResult.value || !props.team) return

  if (props.team.pokemons.length >= (props.maxPokemons ?? 6)) {
    alertMessage.value = 'Équipe complète (6 Pokémons max)'
    return
  }

  if (props.team.pokemons.some(p => p.id === searchResult?.value?.id)) {
    alertMessage.value = 'Ce Pokémon est déjà dans l\'équipe'
    return
  }

  emit('addPokemon', searchResult.value)
  alertMessage.value = `${searchResult.value.name} ajouté à l'équipe!`
  searchResult.value = null
  setTimeout(() => {
    alertMessage.value = ''
  }, 2500)
}

function removePokemon(pokemonId: number) {
  emit('remove', pokemonId)
}
</script>

<template>
  <div class="team-wrapper">
    <!-- Informations de l'équipe -->
    <div class="team-info">
      <h1>Ajouter des Pokémons à {{ team.name }}</h1>
      <p><strong>Nom :</strong> {{ team.name }}</p>
      <p v-if="team.subname"><strong>Sous-titre :</strong> {{ team.subname }}</p>
      <p><strong>Créée le :</strong> {{ formatDate(team.createdAt) }}</p>
    </div>

    <!-- Équipe actuelle -->
    <div class="team-section">
      <h2>Mon équipe ({{ team.pokemons.length }}/{{ maxPokemons ?? 6 }})</h2>

      <div class="pokemons-container">
        <div v-if="team.pokemons.length === 0" class="empty-message">
          Aucun Pokémon dans l'équipe
        </div>

        <div v-for="pokemon in team.pokemons" :key="pokemon.id" class="pokemon-wrapper">
          <PokemonResultSimple :result="pokemon" />
          <button @click="removePokemon(pokemon.id)" class="remove-button">
            ✕ Retirer
          </button>
        </div>
      </div>
    </div>

    <!-- Recherche et résultat -->
    <div class="search-section" v-if="team.pokemons.length < 6">
      <h2>Rechercher un Pokémon</h2>
      <PokemonSearch @result="handleSearchResult" />
      
      <div v-if="alertMessage" class="success-message">{{ alertMessage }}</div>
      <div v-if="searchResult" class="search-result-wrapper">
        <PokemonResultSimple :result="searchResult" />
        <button @click="addPokemonToTeam" class="add-button">
          Ajouter
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.team-info {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.team-info h1 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
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

.search-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-section h2 {
  margin-top: 0;
  color: #333;
  font-size: 1.25rem;
  border-bottom: 2px solid #42b983;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.success-message {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
  margin: 1rem 0;
}

.search-result-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
}

:deep(.search-result-wrapper .result) {
  flex: 1;
  margin-top: 0;
  margin-bottom: 0;
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
  white-space: nowrap;
  height: fit-content;
}

.add-button:hover {
  background-color: #369970;
}

.team-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.team-section h2 {
  margin-top: 0;
  color: #333;
  font-size: 1.25rem;
  border-bottom: 2px solid #42b983;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
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

.pokemon-wrapper {
  position: relative;
  display: flex;
  gap: 1rem;
  align-items: center;
}

:deep(.pokemon-wrapper .result) {
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
  align-self: center;
}

.remove-button:hover {
  background-color: #fcc;
  border-color: #c33;
}

@media (max-width: 600px) {
  .search-result-wrapper {
    flex-direction: column;
    align-items: stretch;
  }

  .add-button {
    width: 100%;
  }

  .pokemon-wrapper {
    flex-direction: column;
    align-items: stretch;
  }

  .remove-button {
    width: 100%;
  }
}
</style>
