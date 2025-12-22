<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <h1>Bienvenue sur Pokédex</h1>
    <p>Explorez le monde des Pokémon</p>
    <RouterLink to="/search" class="btn">Commencer la recherche</RouterLink>
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
</style>