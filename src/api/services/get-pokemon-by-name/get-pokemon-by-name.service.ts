import pokemonApi from '../../instances/pokemon-api'
import type { PokemonResponse } from './pokemon-api.interface'
import type { Pokemon } from './pokemon.interface'

export const getPokemonByName = async (name: string): Promise<Pokemon> => {
  const { data } = await pokemonApi.get<PokemonResponse>(`/pokemon/${name}`)
  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    types: data.types.map((type) => type.type.name),
    frontSprite: data.sprites.front_default
  }
}
