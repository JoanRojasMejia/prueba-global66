import { computed, ref, watch } from 'vue'
import { useInfiniteScroll, useVirtualList } from '@vueuse/core'

import { useGetListPokemons } from '@/api/composables/use-get-list-pokemons'
import { usePokemonStore } from '@/stores/global-store'
import { useGetFuzzySearch } from '@/api/composables/use-get-fuzzy-search'

const LIMIT_PAGES = 64

export const usePokemonsView = () => {
  const store = usePokemonStore()

  const page = ref<number>(0)
  const debouncedSearchTerm = ref<string>('')
  const pokemonsView = computed(() => Object.keys(store.currentPokemonsInView))

  const {
    list: listAll,
    containerProps: containerPropsAll,
    wrapperProps: wrapperPropsAll
  } = useVirtualList(pokemonsView, {
    itemHeight: 54
  })
  const { list, containerProps, wrapperProps } = useVirtualList(pokemonsView, {
    itemHeight: 54
  })

  const { pokemons } = useGetListPokemons(page)
  const {
    pokemons: pokemonsSearch,
    refetch,
    isFetching: isFetchingPokemonsSearch
  } = useGetFuzzySearch(debouncedSearchTerm)

  const loadMorePokemons = () => {
    if (pokemonsView.value.length === 0 && page.value === 0) return
    if (page.value > LIMIT_PAGES) return
    page.value = page.value + 1
  }

  useInfiniteScroll(containerPropsAll.ref, loadMorePokemons, { distance: 80 })

  watch(pokemons, (pokemons) => {
    if (pokemons && Object.keys(pokemons ?? {}).length > 0) {
      store.changePokemonsAPI(pokemons)
    }
  })

  watch(pokemonsSearch, (pokemonsSearch) => {
    if (pokemonsSearch && Object.keys(pokemonsSearch ?? {}).length > 0) {
      store.changeIsSearchEmpty(false)
      store.typeView !== 'search' && store.changeTypeView('search')
      store.changeCurrentPokemonsInView(pokemonsSearch)
      return
    }
    store.changeIsSearchEmpty(true)
  })

  const updateSearchTerm = (value: string) => {
    if (value === '') {
      store.changeTypeView('all')
      return
    }
    debouncedSearchTerm.value = value
    refetch()
    if (containerProps.ref.value) {
      containerProps.ref.value.scrollTop = 0
    }
  }

  const goBackErrorSearch = () => {
    store.changeIsSearchEmpty(false)
    store.changeTypeView('all')
  }

  return {
    containerProps,
    containerPropsAll,
    goBackErrorSearch,
    initialLoader: computed(() => store.initialLoader),
    isFetchingPokemonsSearch,
    isSearchEmpty: computed(() => store.isSearchEmpty),
    list,
    listAll,
    typeView: computed(() => store.typeView),
    updateSearchTerm,
    wrapperProps,
    wrapperPropsAll
  }
}
