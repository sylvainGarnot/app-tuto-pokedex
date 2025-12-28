<script setup lang="ts">
import { ref } from 'vue'
import type { Pokemon } from '../types/pokemon'
import PokemonSearchSimpleSearch from '../components/PokemonSearchSimpleSearch.vue'
import PokemonSearchSimpleResult from '../components/PokemonSearchSimpleResult.vue'


// PROPS
const props = defineProps({
  id: String,
  name: String,
})


// EMITS
const emit = defineEmits<{
  'update:name': [name: string]
}>()


// DATA
const pokemon = ref<Pokemon | null>(null)


// FUNCTIONS
function handleUpdate(result: Pokemon | null) {
  pokemon.value = result
  if (result) {
    emit('update:name', result.name)
  } else {
    emit('update:name', '')
  }
}

</script>

<template>
  <main>
    <PokemonSearchSimpleSearch :id="props.id" :name="props.name" @result="handleUpdate" />
    <PokemonSearchSimpleResult v-if="pokemon && pokemon.id" :pokemon="pokemon" />
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
</style>