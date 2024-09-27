import { usePokemon } from '@/api/composables/use-get-pokemon'
import type { Pokemon } from '@/api/services/get-pokemon-by-name/pokemon.interface'
import { useClipboard } from '@vueuse/core'
import { computed, type ComputedRef } from 'vue'

interface Props {
  pokemonName: string
}

const formatPokemonClipboard = (pokemon: Pokemon | null): string => {
  if (!pokemon) return ''

  const notIncludedKeys = ['id', 'frontSprite']
  const formattedData = Object.entries(pokemon)
    .filter(([key]) => !notIncludedKeys.includes(key))
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ')
  return formattedData
}

export const usePokemonCard = ({ pokemonName }: Props) => {
  const { pokemon, isFetching } = usePokemon(pokemonName)

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  const pokemonInfo: ComputedRef<string> = computed(() => {
    return formatPokemonClipboard(pokemon.value ?? null)
  })

  const { copy, copied } = useClipboard({ source: pokemonInfo })

  return {
    capitalizeFirstLetter,
    copied,
    copy,
    isFetching,
    pokemon
  }
}
