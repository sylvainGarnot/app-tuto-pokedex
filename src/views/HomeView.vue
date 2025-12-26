<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <h1>Bienvenue</h1>
    <p>Explorez le monde des Pokémon</p>
    <div class="buttons">
      <RouterLink to="/search" class="btn">Recherche simple</RouterLink>
      <RouterLink to="/search-by-type" class="btn">Recherche avancée</RouterLink>
      <RouterLink to="/create-team" class="btn btn-secondary">Créer une équipe</RouterLink>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #369970;
}

.btn-secondary {
  background-color: #5a7eff;
}

.btn-secondary:hover {
  background-color: #4a6eef;
}
</style>