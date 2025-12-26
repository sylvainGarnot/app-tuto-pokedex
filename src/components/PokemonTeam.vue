<script setup lang="ts">
import type { Pokemon } from '../types/pokemon'
import PokemonResultSimple from './PokemonResultSimple.vue'

defineProps<{
  pokemons: Pokemon[]
  maxPokemons?: number
}>()

const emit = defineEmits<{
  remove: [pokemonId: number]
}>()

function removePokemon(pokemonId: number) {
  emit('remove', pokemonId)
}
</script>

<template>
  <div class="team-section">
    <h2>Mon équipe ({{ pokemons.length }}/{{ maxPokemons ?? 6 }})</h2>
    
    <div class="pokemons-container">
      <div v-if="pokemons.length === 0" class="empty-message">
        Aucun Pokémon dans l'équipe
      </div>
      
      <div v-for="pokemon in pokemons" :key="pokemon.id" class="pokemon-wrapper">
        <PokemonResultSimple :result="pokemon" />
        <button @click="removePokemon(pokemon.id)" class="remove-button">
          ✕ Retirer
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

:deep(.result) {
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
}

.remove-button:hover {
  background-color: #fcc;
  border-color: #c33;
}

@media (max-width: 600px) {
  .pokemon-wrapper {
    flex-direction: column;
    align-items: stretch;
  }

  .remove-button {
    width: 100%;
  }
}
</style>
