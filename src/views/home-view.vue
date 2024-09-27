<script setup lang="ts">
import IconPikachu from '@/components/icons/IconPikachu.vue'
import router from '@/router'
import { usePokemonStore } from '@/stores/global-store'

const store = usePokemonStore()

const goToPokemonsView = () => {
  store.changeInitialLoader(true)
  router.push({ name: 'pokemons' })
}
</script>

<template>
  <main class="h-screen flex justify-center items-center">
    <div class="flex flex-col justify-center items-center max-w-[570px]">
      <IconPikachu class="w-[325px] mb-5" />
      <h1 class="text-[26px] my-[30px] text-title font-bold leading-[32px]">Welcome to Pokédex</h1>
      <p class="px-[30px] sm:px-0 text-lg text-center leading-[27px] text-content">
        The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
        Pokémon world.
      </p>
      <button
        class="transition-all bg-primary text-button border-none py-[11px] px-5 rounded-full font-bold text-lg leading-[22px] hover:bg-primary-hover mt-[50px]"
        @click="goToPokemonsView"
      >
        Get started
      </button>
    </div>
  </main>
</template>
