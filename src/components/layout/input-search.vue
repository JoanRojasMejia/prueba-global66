<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { usePokemonStore } from '@/stores/global-store'

const store = usePokemonStore()

const searchTerm = ref<string>('')
const inputRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits(['updateSearch'])
const handleUpdateSearch = () => {
  emit('updateSearch', searchTerm.value)
}

const updateDebouncedSearch = useDebounceFn(() => {
  handleUpdateSearch()
}, 1000)

watch(searchTerm, updateDebouncedSearch)
watch(
  computed(() => store.isSearchEmpty),
  (value) => {
    if (value) {
      searchTerm.value = ''
      inputRef.value?.blur()
    }
  }
)
</script>

<template>
  <div class="mt-[30px] mb-[35px] w-full flex items-center justify-center px-[30px]">
    <input
      class="input-search max-w-[570px] w-full border-none rounded-[5px] block pt-[15px] pr-1 pb-[15px] pl-10 text-base leading-3 placeholder:text-[#bfbfbf]"
      type="search"
      name="search"
      ref="inputRef"
      placeholder="Search"
      v-model="searchTerm"
    />
  </div>
</template>

<style scoped>
.input-search {
  background: #ffffff
    url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3Ljc1NTIgMTUuNTYyMkwxNC4yNDk5IDEyLjA1NzRDMTQuMDkxNyAxMS44OTkyIDEzLjg3NzIgMTEuODExMyAxMy42NTIyIDExLjgxMTNIMTMuMDc5MUMxNC4wNDk1IDEwLjU3MDUgMTQuNjI2MSA5LjAwOTY3IDE0LjYyNjEgNy4zMTE3OUMxNC42MjYxIDMuMjcyNzMgMTEuMzUyOCAwIDcuMzEzMDQgMEMzLjI3MzI5IDAgMCAzLjI3MjczIDAgNy4zMTE3OUMwIDExLjM1MDggMy4yNzMyOSAxNC42MjM2IDcuMzEzMDQgMTQuNjIzNkM5LjAxMTIxIDE0LjYyMzYgMTAuNTcyMyAxNC4wNDcxIDExLjgxMzQgMTMuMDc2OFYxMy42NDk4QzExLjgxMzQgMTMuODc0OCAxMS45MDEzIDE0LjA4OTIgMTIuMDU5NSAxNC4yNDc0TDE1LjU2NDggMTcuNzUyMkMxNS44OTUzIDE4LjA4MjYgMTYuNDI5NyAxOC4wODI2IDE2Ljc1NjcgMTcuNzUyMkwxNy43NTE3IDE2Ljc1NzNDMTguMDgyMiAxNi40MjY5IDE4LjA4MjIgMTUuODkyNiAxNy43NTUyIDE1LjU2MjJaTTcuMzEzMDQgMTEuODExM0M0LjgyNzMxIDExLjgxMTMgMi44MTI3MSA5LjgwMDYxIDIuODEyNzEgNy4zMTE3OUMyLjgxMjcxIDQuODI2NDggNC44MjM3OSAyLjgxMjIzIDcuMzEzMDQgMi44MTIyM0M5Ljc5ODc2IDIuODEyMjMgMTEuODEzNCA0LjgyMjk3IDExLjgxMzQgNy4zMTE3OUMxMS44MTM0IDkuNzk3MDkgOS44MDIyOCAxMS44MTEzIDcuMzEzMDQgMTEuODExM1oiIGZpbGw9IiNCRkJGQkYiLz4KPC9zdmc+Cg==')
    no-repeat 13px center;
  box-shadow: 0px 2px 10px 0px #0000000a;
}
</style>
