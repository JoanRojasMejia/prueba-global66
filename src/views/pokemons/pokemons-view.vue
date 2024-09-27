<script setup lang="ts">
import LoaderComponent from '@/components/loaders/loader-component.vue'
import { usePokemonsView } from './composable/use-pokemons-view'
import NavbarButtons from '@/components/layout/navbar-buttons.vue'
import InputSearch from '@/components/layout/input-search.vue'
import PokemonItem from '@/components/pokemon/pokemon-item.vue'

const {
  containerProps,
  containerPropsAll,
  goBackErrorSearch,
  initialLoader,
  isFetchingPokemonsSearch,
  isSearchEmpty,
  list,
  listAll,
  typeView,
  updateSearchTerm,
  wrapperProps,
  wrapperPropsAll
} = usePokemonsView()
</script>

<template>
  <div v-if="initialLoader" class="w-screen h-screen z-[1000] fixed top-0">
    <div
      class="flex justify-center items-center flex-col h-screen w-screen bg-backgound-color relative"
    >
      <LoaderComponent />
    </div>
  </div>
  <main class="flex flex-col items-center w-full">
    <InputSearch @updateSearch="updateSearchTerm" />
    <div
      v-if="isFetchingPokemonsSearch || isSearchEmpty"
      class="px-[30px] w-full flex justify-center items-center"
      :class="isSearchEmpty && '!items-start'"
      style="height: calc(100vh - 200px)"
    >
      <LoaderComponent v-if="isFetchingPokemonsSearch" />
      <div v-else class="flex justify-center items-center flex-col gap-[15px]">
        <p class="text-title font-bold text-4xl">Uh-oh!</p>
        <span class="text-content font-normal text-xl">You look lost on your journey!</span>
        <button
          @click="goBackErrorSearch"
          class="bg-primary hover:bg-primary-hover text-white border-none py-[11px] px-[20px] mt-5 rounded-full text-lg max-w-[275px] font-bold flex justify-center items-center gap-[10px] leading-5 transition-all"
        >
          Go back home
        </button>
      </div>
    </div>
    <div v-else class="px-[30px] w-full flex justify-center">
      <div
        v-if="typeView === 'all'"
        class="w-full"
        style="height: calc(100vh - 200px)"
        v-bind="containerPropsAll"
      >
        <div class="flex flex-col items-center gap-2.5 w-full" v-bind="wrapperPropsAll">
          <PokemonItem
            v-for="pokemon of listAll.map((value) => value.data)"
            :key="pokemon"
            :pokemon="pokemon"
          />
        </div>
      </div>
      <div v-else class="w-full" style="height: calc(100vh - 200px)" v-bind="containerProps">
        <div class="flex flex-col items-center gap-2.5 w-full" v-bind="wrapperProps">
          <PokemonItem
            v-for="pokemon of list.map((value) => value.data)"
            :key="pokemon"
            :pokemon="pokemon"
          />
        </div>
      </div>
    </div>
    <NavbarButtons />
  </main>
</template>
