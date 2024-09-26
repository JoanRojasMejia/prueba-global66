import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useStorage, type RemovableRef } from '@vueuse/core'

const LOCAL_STORAGE_KEY = 'favorite-pokemons'

export const usePokemonStore = defineStore('pokemons', () => {
  const initialLoader = ref<boolean>(false)
  const typeView = ref<'all' | 'favorites' | 'search'>('all')
  const currentPokemonsInView = ref<Record<string, string>>({})
  const favorites = ref<RemovableRef<Record<string, string>>>(
    useStorage<Record<string, string>>(LOCAL_STORAGE_KEY, {}, localStorage, {
      serializer: {
        read: (v) => (v ? JSON.parse(v) : null),
        write: (v) => JSON.stringify(v)
      }
    })
  )
  const allPokemonsAPI = ref<Record<string, string>>({})

  const changeInitialLoader = (value: boolean) => {
    initialLoader.value = value
  }

  const addFavorite = (pokemon_name: string) => {
    favorites.value = { ...favorites.value, [pokemon_name]: pokemon_name }
  }

  const removeFavorite = (pokemon_name: string) => {
    const { [pokemon_name]: _, ...restPokemons } = favorites.value
    favorites.value = restPokemons
  }

  // const changeCurrentPokemons = (current_pokemons: 'all' | 'favorites') => {
  //   if (current_pokemons === currentPokemons.value) return
  //   currentPokemons.value = current_pokemons
  // }

  const existFavorite = (pokemonName: string) => {
    return favorites.value[pokemonName]
  }

  const changePokemonsAPI = (pokemons: Record<string, string>) => {
    allPokemonsAPI.value = { ...allPokemonsAPI.value, ...pokemons }
  }

  const changeTypeView = (value: 'all' | 'favorites' | 'search') => {
    typeView.value = value
  }

  watch(allPokemonsAPI, (pokemons) => {
    if (Object.keys(pokemons).length !== 0) {
      initialLoader.value = false
    }
    currentPokemonsInView.value = pokemons
  })

  watch(initialLoader, (value) => {
    if (Object.keys(allPokemonsAPI.value).length !== 0 && value) {
      initialLoader.value = false
    }
  })

  watch(typeView, (value) => {
    if (value === 'favorites') {
      currentPokemonsInView.value = favorites.value
      return
    }
    currentPokemonsInView.value = allPokemonsAPI.value
  })

  return {
    addFavorite,
    allPokemonsAPI,
    changeInitialLoader,
    changeTypeView,
    typeView,
    changePokemonsAPI,
    currentPokemonsInView,
    existFavorite,
    initialLoader,
    removeFavorite
  }
})
