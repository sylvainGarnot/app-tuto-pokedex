<script setup lang="ts">
import PokemonTeamUpdateName from '@/components/PokemonTeamUpdateName.vue'
import PokemonTeamUpdateAddPokemon from '@/components/PokemonTeamUpdateAddPokemon.vue'


</script>

<template>
  <div class="pokemon-team-update">
    <PokemonTeamUpdateName :button-text="'Valider'" />
    <PokemonTeamUpdateAddPokemon :button-text="'Valider'" />
  </div>
</template>

<style scoped>
.pokemon-team-update {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
