import { computed, ref, watch } from 'vue'
import { useInfiniteScroll, useVirtualList } from '@vueuse/core'

import { useGetListPokemons } from '@/api/composables/use-get-list-pokemons'
import { usePokemonStore } from '@/stores/global-store'

const LIMIT_PAGES = 64

export const usePokemonsView = () => {
  const store = usePokemonStore()

  const page = ref<number>(0)
  const pokemonsView = computed(() => Object.keys(store.currentPokemonsInView))

  const { list, containerProps, wrapperProps } = useVirtualList(pokemonsView, {
    itemHeight: 54
  })

  const { pokemons } = useGetListPokemons(page)

  watch(pokemons, (pokemons) => {
    if (pokemons) {
      store.changePokemonsAPI(pokemons)
    }
  })

  const loadMorePokemons = () => {
    if (pokemonsView.value.length === 0 && page.value === 0) return
    if (page.value > LIMIT_PAGES) return
    page.value = page.value + 1
  }

  useInfiniteScroll(containerProps.ref, loadMorePokemons, { distance: 80 })

  return {
    list,
    containerProps,
    wrapperProps,
    initialLoader: computed(() => store.initialLoader),
    typeView: computed(() => store.typeView),
    currentPokemonsInView: computed(() => store.currentPokemonsInView),
  }
}
