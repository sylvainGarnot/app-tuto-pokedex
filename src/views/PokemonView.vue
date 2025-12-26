<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import PokemonResultDetail from '../components/PokemonResultDetail.vue'

const route = useRoute()
const router = useRouter()

function goBack() {
  router.back()
}
</script>

<template>
  <main>
    <button class="back-button" @click="goBack">← Retour</button>
    <PokemonResultDetail :id="route.params.id as string" />
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.back-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 2rem;
}

.back-button:hover {
  background-color: #e0e0e0;
}

@media (max-width: 768px) {
  main {
    padding: 1rem;
  }
}
</style>
