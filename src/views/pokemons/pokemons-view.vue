<script setup lang="ts">
import LoaderComponent from '@/components/loaders/loader-component.vue'
import { usePokemonsView } from './composable/use-pokemons-view'
import NavbarButtons from '@/components/layout/navbar-buttons.vue'
import InputSearch from '@/components/layout/input-search.vue'
import PokemonItem from '@/components/pokemon/pokemon-item.vue'

const { list, containerProps, wrapperProps, initialLoader, typeView, currentPokemonsInView } =
  usePokemonsView()
</script>

<template>
  <div v-if="initialLoader" class="w-screen h-screen z-[1000] fixed top-0">
    <LoaderComponent />
  </div>
  <main class="flex flex-col items-center w-full">
    <InputSearch />
    <div
      v-if="typeView === 'all'"
      class="w-full"
      style="height: calc(100vh - 200px)"
      v-bind="containerProps"
    >
      <div class="flex flex-col items-center gap-2.5 w-full" v-bind="wrapperProps">
        <PokemonItem
          v-for="pokemon of list.map((value) => value.data)"
          :key="pokemon"
          :pokemon="pokemon"
        />
      </div>
    </div>
    <div v-else class="w-full" style="height: calc(100vh - 200px)">
      <div class="flex flex-col items-center gap-2.5 w-full">
        <PokemonItem
          v-for="pokemon of Object.values(currentPokemonsInView)"
          :key="pokemon"
          :pokemon="pokemon"
        />
      </div>
    </div>
    <NavbarButtons />
  </main>
</template>
