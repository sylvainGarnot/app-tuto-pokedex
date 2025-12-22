<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Pokemon, PokemonType } from '../types/pokemon'

const searchId = ref('')
const searchName = ref('')
const searchType = ref('')

const results = ref<Pokemon | null>(null)
const loading = ref(false)
const error = ref('')

watch(searchId, (newValue) => {
  if (newValue) {
    searchName.value = ''
  }
})

watch(searchName, (newValue) => {
  if (newValue) {
    searchId.value = ''
  }
})

function searchPokemon() {
  const searchValue = searchId.value || searchName.value

  if (!searchValue) {
    error.value = 'Veuillez entrer un ID ou un nom'
    return
  }

  loading.value = true
  error.value = ''

  fetch(`https://pokebuildapi.fr/api/v1/pokemon/${searchValue}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Pokémon non trouvé')
      }
      return response.json()
    })
    .then((data) => {
      results.value = {
        id: data.id,
        pokedexId: data.pokedexId,
        name: data.name,
        image: data.image,
        sprite: data.sprite,
        types: data.apiTypes.map((type: PokemonType) => ({
          name: type.name,
          image: type.image,
        })),
      }
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
      <div class="pokemon-card">
        <span class="pokemon-id">{{ results.id }}</span>
        <span class="pokemon-name">{{ results.name }}</span>
        <img v-if="results.sprite" :src="results.sprite" :alt="results.name" class="pokemon-sprite" />
        <div v-if="results.types && results.types.length > 0" class="types-icons">
          <img v-for="type in results.types" :key="type.name" :src="type.image" :alt="type.name" class="type-icon" />
        </div>
      </div>
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
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pokemon-card {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .pokemon-card {
    flex-direction: column;
    gap: 1.5rem;
  }
}

.pokemon-id {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  min-width: 50px;
}

.pokemon-name {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  min-width: 100px;
}

.pokemon-info {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #eee;
  min-width: 150px;
}

.pokemon-info p {
  margin: 0.5rem 0;
  color: #333;
  font-size: 0.95rem;
}

.pokemon-sprite {
  max-width: 100px;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.pokemon-sprite:hover {
  transform: scale(1.05);
}

.pokemon-types {
  grid-column: auto;
  grid-row: auto;
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #eee;
  height: fit-content;
  min-width: 150px;
}

.pokemon-types h3 {
  margin-top: 0;
  color: #333;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.types-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.types-icons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-left: auto;
}

.type-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
</style>
