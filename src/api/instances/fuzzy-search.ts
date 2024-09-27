import axios from 'axios'

const fuzzySearchApi = axios.create({
  baseURL: 'https://fuzzy-search-pokemons.deno.dev/'
})

export default fuzzySearchApi
