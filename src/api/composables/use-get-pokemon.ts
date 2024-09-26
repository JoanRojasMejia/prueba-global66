import type { Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { getPokemonByName } from '../services/get-pokemon-by-name/get-pokemon-by-name.service'

export const usePokemon = (name: string | Ref<string>) => {
  const {
    isLoading,
    data: pokemon,
    isError,
    error: errorMessage,
    isFetching
  } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () =>
      getPokemonByName(typeof name === 'string' ? name.toLowerCase() : name.value.toLowerCase()),
    staleTime: 1000 * 60 * 30,
    retry: 2
  })

  return {
    isLoading,
    isError,
    pokemon,
    errorMessage,
    isFetching
  }
}
