<script setup lang="ts">
import { computed } from 'vue'
import IconAll from '../icons/IconAll.vue'
import IconFavorite from '../icons/IconFavorite.vue'

import { usePokemonStore } from '@/stores/global-store'

const store = usePokemonStore()

const typeView = computed(() => store.typeView)

const goFavorites = () => {
  store.changeTypeView('favorites')
}

const goAll = () => {
  store.changeTypeView('all')
}
</script>

<template>
  <nav
    class="nav-container fixed bottom-0 bg-white h-20 w-full flex justify-center items-center gap-[15px] px-[30px]"
  >
    <button
      class="text-white border-none py-[11px] px-[20px] rounded-full text-lg max-w-[275px] w-full font-bold flex justify-center items-center gap-[10px] leading-5 transition-all"
      :class="
        typeView === 'all'
          ? 'bg-primary hover:bg-primary-hover'
          : 'bg-secondary hover:bg-secondary-hover'
      "
      @click="goAll"
    >
      <IconAll class="icon" />
      All
    </button>
    <button
      class="text-white border-none py-[11px] px-[20px] rounded-full text-lg max-w-[275px] w-full font-bold flex justify-center items-center gap-[10px] leading-5 transition-all"
      :class="
        typeView === 'favorites'
          ? 'bg-primary hover:bg-primary-hover'
          : 'bg-secondary hover:bg-secondary-hover'
      "
      @click="goFavorites"
    >
      <IconFavorite color="#ffff" class="icon" />
      Favorites
    </button>
  </nav>
</template>

<style scoped>
.nav-container {
  box-shadow: 0px -5px 4px 0px #0000000d;
}
</style>
