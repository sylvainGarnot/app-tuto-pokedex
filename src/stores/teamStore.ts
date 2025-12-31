import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { PokemonTeam, Pokemon, PokemonType } from '../types/pokemon'

export const useTeamStore = defineStore('team', () => {

  // STATE
  const currentTeam = ref<PokemonTeam | null>(null)
  const teams = ref<PokemonTeam[]>([])


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

  async function apiPostTeam(team: PokemonTeam) {
    try {
      await fetch('http://localhost:3000/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(team),
      })
      clearCurrentTeam()
    } catch {
      // error handling
    } finally {
      // loading false
    }
  }

  // FUNCTION USING FETCH
  // async function apiGetTeams() {
  //   return fetch('http://localhost:3000/teams')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Erreur lors de la récupération des équipes')
  //       }
  //       return response.json()
  //     })
  //     .then(data => {
  //       teams.value = data
  //       return data
  //     })
  //     .catch(error => {
  //       console.error('Erreur:', error)
  //       throw error
  //     })
  // }

  // FUNCTION USING AXIOS
  async function apiGetTeams() {
    return axios.get('http://localhost:3000/teams')
      .then(response => {
        teams.value = response.data
        return response.data
      })
      .catch(error => {
        console.error('Erreur:', error)
        throw error
      })
  }

  async function apiGetTeam(id: string) {
    axios.get('http://localhost:3000/teams/' + id)
      .then(response => {
        setCurrentTeam({
          id: response.data.id,
          name: response.data.name,
          subname: response.data.subname,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
          pokemons: response.data.pokemons.map((pokemon: Pokemon) => ({
            id: pokemon.id,
            pokedexId: pokemon.pokedexId,
            name: pokemon.name,
            image: pokemon.image,
            sprite: pokemon.sprite,
            types: pokemon.types.map((type: PokemonType) => ({
              name: type.name,
              image: type.image,
            })),
          })),
        } as PokemonTeam)
      })
      .catch(error => {
        console.error('Erreur:', error)
      })
  }

  async function apiDeleteTeam(teamId: string) {
    return axios.delete(`http://localhost:3000/teams/${teamId}`)
      .then(() => {
        teams.value = teams.value.filter(team => team.id !== teamId)
        if (currentTeam.value?.id === teamId) {
          clearCurrentTeam()
        }
      })
      .catch(error => {
        console.error('Erreur:', error)
        throw error
      })
  }

  return {
    currentTeam,
    teams,
    setCurrentTeam,
    addCurrentTeamPokemon,
    removeCurrentTeamPokemon,
    apiGetTeam,
    apiGetTeams,
    apiPostTeam,
    apiDeleteTeam,
    clearCurrentTeam,
  }
})
