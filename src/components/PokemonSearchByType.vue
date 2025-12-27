<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Pokemon, PokemonType } from '../types/pokemon'


// PROPS
const props = defineProps({
  type: String,
  type1: String,
  type2: String,
})


// EMITS
const emit = defineEmits<{
  result: [result: Pokemon[]]
  'type-selected': [types: { type1: PokemonType | null; type2: PokemonType | null }]
}>()


// DATA
const apiTypes = ref<PokemonType[]>([])
const inputType1 = ref<PokemonType | null>(null)
const inputType2 = ref<PokemonType | null>(null)
const loading = ref(false)
const error = ref('')


// ON MOUNTED
onMounted(() => {
  getApiTypes().then(() => {
    if (props.type) {
      const foundType = apiTypes.value.find((t) => t.name.toLowerCase() === props.type?.toLowerCase())
      if (foundType) inputType1.value = foundType
    } else {
      if (props.type1) {
        const foundType1 = apiTypes.value.find((t) => t.name.toLowerCase() === props.type1?.toLowerCase())
        if (foundType1) inputType1.value = foundType1
      }
      if (props.type2) {
        const foundType2 = apiTypes.value.find((t) => t.name.toLowerCase() === props.type2?.toLowerCase())
        if (foundType2) inputType2.value = foundType2
      }
    }

    if (inputType1.value || inputType2.value) {
      searchByType()
    }
  })
})


// WATCHERS
watch(() => inputType1.value, () => {
  searchByType()
})

watch(() => inputType2.value, () => {
  searchByType()
})


// FUNCTIONS
function getApiTypes(): Promise<void> {
  return fetch('https://pokebuildapi.fr/api/v1/types')
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
    emit('result', [])
    return
  }

  loading.value = true
  emit('type-selected', { type1: inputType1.value, type2: inputType2.value })

  let url: string
  if (inputType1.value && inputType2.value) {
    url = `https://pokebuildapi.fr/api/v1/pokemon/types/${inputType1.value.name}/${inputType2.value.name}`
  } else {
    url = `https://pokebuildapi.fr/api/v1/pokemon/type/${inputType1.value?.name}`
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const result = [] as Pokemon[]
      for (let index = 0; index < data.length; index++) {
        result.push({
            id: data[index].id || '',
            pokedexId: data[index].pokedexId,
            name: data[index].name,
            image: data[index].image,
            sprite: data[index].sprite,
            types: data[index].apiTypes.map((type: PokemonType) => ({
              name: type.name,
              image: type.image,
            })),
          })         
      }
      emit('result', result)
    })
    .catch(() => {
      error.value = 'Erreur lors de la recherche'
      emit('result', [])
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
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
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="loading" class="load">Chargement...</div>
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
</style>
