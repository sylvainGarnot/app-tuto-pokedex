<script setup lang="ts">
import { ref } from 'vue'
import type { Pokemon } from '../types/pokemon'

const searchId = ref('')
const searchName = ref('')
const searchType = ref('')

const results = ref<Pokemon | null>(null)
const loading = ref(false)
const error = ref('')

function searchPokemon() {
  if (!searchId.value) {
    error.value = 'Veuillez entrer un ID'
    return
  }

  loading.value = true
  error.value = ''

  fetch(`https://pokebuildapi.fr/api/v1/pokemon/${searchId.value}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Pokémon non trouvé')
      }
      return response.json()
    })
    .then((data) => {
      results.value = data
    })
    .catch((err) => {
      error.value = err instanceof Error ? err.message : 'Erreur lors de la recherche'
      results.value = null
    })
    .finally(() => {
      loading.value = false
    })
}

</script>

<template>
  <main>
    <h1>Recherche Pokémon</h1>
    <div class="search-container">
      <div class="input-group">
        <label for="id">ID</label>
        <input
          id="id"
          v-model="searchId"
          type="text"
          placeholder="Entrez l'ID..."
          class="search-input"
        />
      </div>
      <div class="input-group">
        <label for="name">Nom</label>
        <input
          id="name"
          v-model="searchName"
          type="text"
          placeholder="Entrez le nom..."
          class="search-input"
        />
      </div>
      <div class="input-group">
        <label for="type">Type</label>
        <input
          id="type"
          v-model="searchType"
          type="text"
          placeholder="Entrez le type..."
          class="search-input"
        />
      </div>
      <button class="search-button" @click="searchPokemon" :disabled="loading">
        {{ loading ? 'Recherche...' : 'Rechercher' }}
      </button>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="results" class="results">
      <h2>Résultats de la recherche</h2>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  max-width: 800px;
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

.search-input {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
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

.results {
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 4px;
  margin-top: 2rem;
}

.results h2 {
  color: #333;
  margin-top: 0;
}

.pokemon-image {
  max-width: 200px;
  margin: 1rem 0;
}

.results p {
  margin: 0.5rem 0;
  color: #666;
}
</style>
