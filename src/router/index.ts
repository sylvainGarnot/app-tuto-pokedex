import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import SearchAdvancedView from '../views/SearchAdvancedView.vue'
import PokemonView from '../views/PokemonView.vue'
import CreateTeamView from '../views/CreateTeamView.vue'
import CreateTeamAddPokemonView from '../views/CreateTeamAddPokemonView.vue'
import PokemonTeamView from '../views/PokemonTeamView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/search-advanced',
      name: 'SearchAdvancedView',
      component: SearchAdvancedView,
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon',
      component: PokemonView,
    },
    {
      path: '/create-team',
      name: 'createTeam',
      component: CreateTeamView,
    },
    {
      path: '/create-team/add-pokemon/',
      name: 'createTeamAddPokemon',
      component: CreateTeamAddPokemonView,
    },
    {
      path: '/team/:id',
      name: 'teamDetail',
      component: PokemonTeamView,
    },
  ],
})

export default router
