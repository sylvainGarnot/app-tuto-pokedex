import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import SearchAdvancedView from '../views/SearchAdvancedView.vue'
import PokemonView from '../views/PokemonView.vue'
import CreateTeamView from '../views/CreateTeamView.vue'
import CreateTeamNameView from '../views/CreateTeamView/NameView.vue'
import CreateTeamAddPokemonView from '../views/CreateTeamView/AddPokemonView.vue'
import CreateTeamResumeView from '../views/CreateTeamView/ResumeView.vue'
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
      component: CreateTeamView,
      children: [
        {
          path: '',
          name: 'createTeamName',
          component: CreateTeamNameView,
        },
        {
          path: 'add-pokemon',
          name: 'createTeamAddPokemon',
          component: CreateTeamAddPokemonView,
        },
        {
          path: 'resume',
          name: 'createTeamResume',
          component: CreateTeamResumeView,
        },
      ],
    },
    {
      path: '/team/:id',
      name: 'teamDetail',
      component: PokemonTeamView,
    },
  ],
})

export default router
