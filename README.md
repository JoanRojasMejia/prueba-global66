# 🧪 Prueba Técnica: Pokédex con Vue.js

Este proyecto es una prueba técnica desarrollada con Vue.js para Global66, centrada en una Pokédex interactiva. Los usuarios pueden explorar una lista de pokémons, guardarlos en favoritos y realizar búsquedas difusas para encontrar pokémons de manera eficiente.

<img style="border-radius: 20px;" src="https://raw.githubusercontent.com/JoanRojasMejia/prueba-global66/refs/heads/main/public/screen-web.webp">

<div align="center">

![Static Badge](https://img.shields.io/badge/author-joan_rojas-%237849F7?style=for-the-badge)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fpokedex-global66.vercel.app%2F&up_color=%23156545&style=for-the-badge)
</div>

## 🛠️ Tecnologías y librerías utilizadas

- Vue.js: Framework principal utilizado para la construcción de la aplicación.

- VueUse: Librería de utilidades para Vue.js utilizada para optimizar el manejo de listas y búsqueda.
  - useVirtualList: 🗂️ Implementación de una lista virtual para mejorar el rendimiento en el listado de pokémons.

  - useInfiniteScroll: ♾️ Gestión de scroll infinito, solicitando nuevos datos de pokémons a medida que el usuario baja por la lista.

  - useDebounce: ⏳ Aplicado al input de búsqueda, evitando llamadas repetitivas a la API. Se establece un retraso de 1 segundo después de la última entrada antes de ejecutar la búsqueda.

- VueQuery: 🔍 Librería utilizada para manejar las llamadas a la API.
Cacheo de las respuestas de la API para evitar múltiples solicitudes de la misma información, ya que los datos son estáticos.

- Pinia: 📦 Manejador de estados global para compartir datos entre componentes de manera eficiente.

- Vue Router: 🚦 Enrutador principal de la aplicación para gestionar la navegación entre diferentes vistas de la Pokédex.

## ✨ Funcionalidades Principales

- 📋 Listado de Pokémons: 

  - Los pokémons se listan utilizando una lista virtual para optimizar el enderizado cuando se gestiona una gran cantidad de pokémons.

  - Scroll infinito que carga nuevos pokémons automáticamente a medida que el usuario baja en la página.

- 🔍 Búsqueda Difusa:

  - La barra de búsqueda incluye un mecanismo de debounce. Después de 1 segundo sin escribir, se ejecuta una búsqueda difusa para encontrar pokémons de forma eficiente.

- ⭐ Favoritos:

  - Los usuarios pueden marcar pokémons como favoritos, almacenando esta información localmente en el navegador.

## 📂 Estructura del Proyecto

```
src/
├── api/
│   ├── composables/
│   │   ├── use-get-fuzzy-search.ts
│   │   ├── use-get-list-pokemons.ts
│   │   └── use-get-pokemon.ts
│   ├── instances/
│   │   ├── fuzzy-search.ts
│   │   └── pokemon-api.ts
│   └── services/
│       ├── get-pokemon-by-name/
│       │   ├── get-pokemon-by-name.service.ts
│       │   ├── pokemon-api.interface.ts
│       │   └── pokemon.interface.ts
│       ├── get-pokemon-by-search/
│       │   └── get-pokemons-by-search.service.ts
│       └── get-pokemons/
│           ├── get-pokemons.service.ts
│           └── pokemons-api.interface.ts
├── assets/
├── components/
│   ├── icons/
│   └── layout/
│       ├── input-search.vue
│       └── navbar-buttons.vue
├── loaders/
├── modal/
│   ├── favorite-button.vue
│   └── pokemon-item.vue
├── router/
│   └── index.ts
├── stores/
│   └── global-store.ts
├── views/
│   ├── pokemons/
│   │   ├── composable/
│   │   │   └── use-pokemons-view.ts
│   │   └── pokemons-view.vue
│   └── home-view.vue
├── App.vue
├── main.ts
├── ...
```

## 🚀 Instalación

1. Clona el repositorio:
```sh
git clone https://github.com/JoanRojasMejia/prueba-global66.git
cd prueba-global66
```
2. Instala las dependencias:

```sh
npm install
```

3. Inicia el proyecto en modo de desarrollo:

```sh
npm run dev
```
