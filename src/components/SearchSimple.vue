<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { Pokemon, PokemonType } from '../types/pokemon'

// VARIABLES D'ETAT
const inputId = ref('')
const inputName = ref('')
const loading = ref(false)
const error = ref('')

const props = defineProps({
  id: String,
  name: String,
})

const emit = defineEmits<{
  result: [results: Pokemon | null]
}>()


// MOUNTED
onMounted(() => {
  if (props.id) {
    inputId.value = props.id
    searchPokemon()
  } else if (props.name) {
    inputName.value = props.name
    searchPokemon()
  }
})

// WATCHERS
watch(inputId, (newValue) => {
  if (newValue) {
    inputName.value = ''
  }
})

watch(inputName, (newValue) => {
  if (newValue) {
    inputId.value = ''
  }
})


// FONCTIONS
function searchPokemon() {
  const searchValue = inputId.value || inputName.value
  error.value = ''

  if (!searchValue) {
    error.value = 'Veuillez entrer un ID ou un nom'
    return
  }

  loading.value = true

  fetch(`https://pokebuildapi.fr/api/v1/pokemon/${searchValue}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      const results: Pokemon = {
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
      emit('result', results)
    })
    .catch(() => {
      error.value = 'Erreur lors de la recherche'
      emit('result', null)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="search-container">
    <div class="input-group">
      <label for="id">ID</label>
      <input
        id="id"
        v-model="inputId"
        type="text"
        placeholder="Entrez l'ID..."
        class="search-input"
        @keyup.enter="searchPokemon"
      />
    </div>
    <div class="input-group">
      <label for="name">Nom</label>
      <input
        id="name"
        v-model="inputName"
        type="text"
        placeholder="Entrez le nom..."
        class="search-input"
        @keyup.enter="searchPokemon"
      />
    </div>
    <button class="search-button" @click="searchPokemon" :disabled="loading">
      {{ loading ? 'Recherche...' : 'Rechercher' }}
    </button>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<style scoped>
.error {
  background-color: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
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
</style>
