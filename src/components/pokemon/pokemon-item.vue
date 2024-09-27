<script setup lang="ts">
import { ref } from 'vue'
import FavoriteButton from './favorite-button.vue'
import PokemonCard from '../modal/pokemon-card.vue'

interface Props {
  pokemon: string
}
defineProps<Props>()

const showModal = ref<boolean>(false)

const onClickShowModal = () => {
  showModal.value = !showModal.value
}
</script>

<template>
  <div
    class="flex justify-between items-center py-[5px] px-[8px] bg-white max-w-[570px] rounded-[5px] w-full relative"
  >
    <span @click="onClickShowModal" class="absolute h-full w-[80%] sm:w-[85%] md:w-[90%] cursor-pointer left-0" />
    <span class="text-[22px] pl-[10px] capitalize text-title leading-[27px]">{{ pokemon }}</span>
    <FavoriteButton :pokemonName="pokemon" />
  </div>
  <Teleport to="body">
    <Transition name="favorite-transition" mode="out-in">
      <PokemonCard :pokemonName="pokemon" v-if="showModal" @close="onClickShowModal" />
    </Transition>
  </Teleport>
</template>
