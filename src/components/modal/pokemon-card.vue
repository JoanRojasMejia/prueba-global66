<script setup lang="ts">
import IconClose from '../icons/IconClose.vue'
import IconPokeball from '../icons/IconPokeball.vue'
import FavoriteButton from '../pokemon/favorite-button.vue'
import { usePokemonCard } from './composable/use-pokemon-card'

interface Props {
  pokemonName: string
}
const props = defineProps<Props>()

const { capitalizeFirstLetter, copied, copy, isFetching, pokemon } = usePokemonCard(props)

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
  >
    <article
      class="bg-white mx-7 rounded-md flex flex-col min-w-[315px] max-w-[570px] max-h-[506px]"
    >
      <header class="relative h-[220px] w-full flex justify-center items-center">
        <button
          @click="closeModal"
          class="absolute right-0 top-0 z-[100] border-none rounded-full w-[26px] h-[26px] bg-transparent cursor-pointer transform translate-x-[-12px] translate-y-[12px]"
        >
          <IconClose />
        </button>
        <div class="absolute animate-rotation" v-if="isFetching">
          <IconPokeball />
        </div>
        <img
          :src="pokemon?.frontSprite"
          :alt="pokemon?.name"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[315px] object-cover"
        />
        <img
          src="../../assets/images/background-image.webp"
          alt="background image"
          class="w-full h-[220px] object-cover rounded-t-md"
        />
      </header>
      <footer class="px-[30px] py-5">
        <div>
          <p
            class="pb-2 border-[#e8e8e8] border-b-[1px] text-lg leading-[22px] text-content font-normal"
          >
            <strong>Name:</strong>
            {{ capitalizeFirstLetter(pokemon?.name ?? '') }}
          </p>
          <p
            class="py-2 border-[#e8e8e8] border-b-[1px] text-lg leading-[22px] text-content font-normal"
          >
            <strong>Weight:</strong> {{ pokemon?.weight }}
          </p>
          <p
            class="py-2 border-[#e8e8e8] border-b-[1px] text-lg leading-[22px] text-content font-normal"
          >
            <strong>Height:</strong> {{ pokemon?.height }}
          </p>
          <p
            class="py-2 border-[#e8e8e8] border-b-[1px] text-lg leading-[22px] text-content font-normal"
          >
            <strong>Types:</strong>
            {{ pokemon?.types.map((type: any) => capitalizeFirstLetter(type)).join(', ') }}
          </p>
        </div>
        <div class="pt-5 flex justify-between">
          <button
            @click="copy()"
            class="bg-primary hover:bg-primary-hover text-white border-none py-[11px] px-[20px] rounded-full text-lg font-bold flex justify-center items-center leading-5 transition-all"
          >
            {{ copied ? 'Copied!' : 'Share to my friends' }}
          </button>
          <FavoriteButton :pokemonName="pokemon?.name ?? ''" />
        </div>
      </footer>
    </article>
  </div>
</template>
