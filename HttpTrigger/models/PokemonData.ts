
export interface PokemonType {
    type: {
      name: string
    }
  }

export interface PokemonData {
    name: string
    types: PokemonType[]
  }   

export interface PokemonsList {
    pokemons: string[]
  }