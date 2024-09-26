import pokemonApi from '../../instances/pokemon-api'
import type { PokemonsListResponse } from './pokemons-api.interface'

const POKEMONS_PER_PAGE = 20

export const getPokemons = async (page: number): Promise<Record<string, string>> => {
  const offset = page * POKEMONS_PER_PAGE
  const { data } = await pokemonApi.get<PokemonsListResponse>(
    `/pokemon?limit=${POKEMONS_PER_PAGE}&offset=${offset}`
  )

  const listPokemons = data.results.reduce((acc: Record<string, string>, curr) => {
    acc[curr.name] = curr.name
    return acc
  }, {})
  return listPokemons
}
