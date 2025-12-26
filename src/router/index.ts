import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import SearchByTypeView from '../views/SearchByTypeView.vue'
import PokemonView from '../views/PokemonView.vue'
import CreateTeamView from '../views/CreateTeamView.vue'

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
      path: '/search-by-type',
      name: 'searchByType',
      component: SearchByTypeView,
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
  ],
})

export default router
