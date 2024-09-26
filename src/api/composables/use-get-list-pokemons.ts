import { type Ref } from 'vue'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { getPokemons } from '../services/get-pokemons/get-pokemons.service'

export const useGetListPokemons = (page: Ref<number>) => {
  const {
    isLoading,
    data: pokemons,
    isError,
    error,
    isFetching
  } = useQuery({
    queryKey: ['pokemons', page],
    queryFn: () => getPokemons(page.value),
    placeholderData: keepPreviousData,
    retry: 3
  })

  return {
    pokemons,
    isLoading,
    isError,
    error,
    isFetching
  }
}
