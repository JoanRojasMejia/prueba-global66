import fuzzySearchApi from '@/api/instances/fuzzy-search'
import type { Result } from '../get-pokemons/pokemons-api.interface'

export const getPokemonsBySearch = async (pokemonName: string): Promise<Record<string, string>> => {
  const { data } = await fuzzySearchApi.get<Result[]>(`/searchPokemon?pokemonName=${pokemonName}`)

  const listPokemons = data.reduce((acc: Record<string, string>, curr) => {
    acc[curr.name] = curr.name
    return acc
  }, {})
  return listPokemons
}
