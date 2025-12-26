import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PokemonTeam, Pokemon } from '../types/pokemon'

export const useTeamStore = defineStore('team', () => {

  // STATE
  const currentTeam = ref<PokemonTeam | null>(null)
  // const teams = ref<PokemonTeam[]>([])


  // FUNCTIONS
  function setCurrentTeam(team: PokemonTeam) {
    currentTeam.value = team
  }

  function addCurrentTeamPokemon(pokemon: Pokemon) {
    if (currentTeam.value && currentTeam.value.pokemons.length < 6) {
      currentTeam.value.pokemons.push(pokemon)
    }
  }

  function removeCurrentTeamPokemon(pokemonId: number) {
    if (currentTeam.value) {
      currentTeam.value.pokemons = currentTeam.value.pokemons.filter(
        p => p.id !== pokemonId
      )
    }
  }

  function clearCurrentTeam() {
    currentTeam.value = null
  }

  return {
    currentTeam,
    setCurrentTeam,
    addCurrentTeamPokemon,
    removeCurrentTeamPokemon,
    clearCurrentTeam,
  }
})
