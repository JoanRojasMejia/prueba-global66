import { type Ref } from 'vue'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { getPokemonsBySearch } from '../services/get-pokemon-by-search/get-pokemons-by-search.service'

export const useGetFuzzySearch = (pokemonName: Ref<string>) => {
  const {
    data: pokemons,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ['pokemons-search', pokemonName.value],
    queryFn: () => getPokemonsBySearch(pokemonName.value),
    placeholderData: keepPreviousData,
    enabled: false,
    retry: 2
  })

  return {
    isFetching,
    pokemons,
    refetch
  }
}
