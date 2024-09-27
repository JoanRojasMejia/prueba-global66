<script setup lang="ts">
import { computed } from 'vue'

import IconFavorite from '../icons/IconFavorite.vue'
import { usePokemonStore } from '@/stores/global-store'

interface Props {
  pokemonName: string
}

const { pokemonName } = defineProps<Props>()
const store = usePokemonStore()

const isFavorite = computed(() => store.existFavorite(pokemonName))

const toggleFavorite = () => {
  if (isFavorite.value) {
    store.removeFavorite(pokemonName)
    return
  }
  store.addFavorite(pokemonName)
}
</script>

<template>
  <button
    @click="toggleFavorite()"
    class="flex items-center justify-center w-11 h-11 rounded-full border-none cursor-pointer bg-[#f5f5f5]"
  >
    <Transition name="favorite-transition" mode="out-in">
      <IconFavorite color="#ECA539" v-if="store.existFavorite(pokemonName)" />
      <IconFavorite color="#BFBFBF" v-else />
    </Transition>
  </button>
</template>
