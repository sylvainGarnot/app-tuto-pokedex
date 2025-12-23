<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Pokemon, PokemonType } from '../types/pokemon'

const apiTypes = ref<PokemonType[]>([])
const inputType1 = ref<PokemonType | null>(null)
const inputType2 = ref<PokemonType | null>(null)
const results = ref<Pokemon[]>([])

const loading = ref(false)
const error = ref('')

onMounted(() => {
  loadApiTypes()
})

function loadApiTypes() {
  fetch('https://pokebuildapi.fr/api/v1/types')
    .then((response) => response.json())
    .then((data) => {
      apiTypes.value = data
    })
    .catch((err) => {
      console.error('Erreur lors du chargement des types:', err)
    })
}

function searchByType() {
  if (!inputType1.value && !inputType2.value) {
    error.value = 'Veuillez sélectionner au moins un type'
    return
  }

  loading.value = true
  error.value = ''

  let url: string
  if (inputType1.value && inputType2.value) {
    url = `https://pokebuildapi.fr/api/v1/pokemon/types/${inputType1.value.name}/${inputType2.value.name}`
  } else {
    url = `https://pokebuildapi.fr/api/v1/pokemon/type/${inputType1.value?.name}`
  }

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Type non trouvé')
      }
      return response.json()
    })
    .then((data) => {
      results.value = data
    })
    .catch((err) => {
      error.value = err instanceof Error ? err.message : 'Erreur lors de la recherche'
      results.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <main>
    <h1>Recherche par Type</h1>
    <div class="search-container">
      <div class="input-group">
        <label for="type1">Type 1</label>
        <div class="input-with-button">
          <select
            id="type1"
            v-model="inputType1"
            class="search-input"
            @keyup.enter="searchByType"
          >
            <option value="">Sélectionnez un type...</option>
            <option v-for="type in apiTypes" :key="type.name" :value="type">
              {{ type.name }}
            </option>
          </select>
          <img v-if="inputType1?.image" :src="inputType1.image" :alt="inputType1.name" class="type-image" />
        </div>
      </div>
      <div class="input-group">
        <label for="type2">Type 2</label>
        <div class="input-with-button">
          <select
            id="type2"
            v-model="inputType2"
            class="search-input"
            :disabled="!inputType1"
            @keyup.enter="searchByType"
          >
            <option value="">Sélectionnez un type...</option>
            <option v-for="type in apiTypes" :key="type.name" :value="type">
              {{ type.name }}
            </option>
          </select>
          <img v-if="inputType2?.image" :src="inputType2.image" :alt="inputType2.name" class="type-image" />
        </div>
      </div>
      <button class="search-button" @click="searchByType" :disabled="loading">
        {{ loading ? '...' : 'Chercher' }}
      </button>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="results.length > 0" class="results-list">
      <h2>{{ results.length }} Pokémon trouvé(s)</h2>
      <div class="pokemon-grid">
        <div v-for="pokemon in results" :key="pokemon.id" class="pokemon-item">
          <span class="pokemon-id">{{ pokemon.id }}</span>
          <span class="pokemon-name">{{ pokemon.name }}</span>
          <img v-if="pokemon.sprite" :src="pokemon.sprite" :alt="pokemon.name" class="pokemon-sprite" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.search-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}

.input-with-button {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
}

.type-image {
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 4px;
}

.search-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.search-button:hover {
  background-color: #369970;
}

.search-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  background-color: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.results-list {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.results-list h2 {
  color: #333;
  margin-top: 0;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
}

.pokemon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #eee;
  transition: transform 0.2s ease;
}

.pokemon-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.pokemon-id {
  font-size: 0.9rem;
  font-weight: bold;
  color: #666;
}

.pokemon-name {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  text-transform: capitalize;
}

.pokemon-sprite {
  max-width: 100px;
  height: auto;
  border-radius: 4px;
}
</style>
