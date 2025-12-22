export interface Pokemon {
  id: number
  pokedexId: number
  name: string
  image: string
  sprite: string
  types: PokemonType[]
}

export interface PokemonType {
  name: string
  image: string
}