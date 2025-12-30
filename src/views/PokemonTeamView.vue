<script setup lang="ts">
import { useRoute } from 'vue-router'
import PokemonTeamDetail from '../components/PokemonTeamDetail.vue'
import AppButtonBack from '@/layout/AppButtonBack.vue'

const route = useRoute()

</script>

<template>
  <main>
    <AppButtonBack />
    <PokemonTeamDetail
      v-if="route.params.id" 
      :id="(route.params.id as string)"
    />
  </main>
</template>

<style scoped lang="scss">
.delete-button {
  margin: 50px auto;
  padding: 0.75rem 1rem;
  background-color: #fee;
  color: #c33;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;
  white-space: nowrap;
  min-width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #fcc;
    border-color: #c33;
  }
}
</style>
