<script setup lang="ts">
import { ref } from 'vue'

const searchId = ref('')
const searchName = ref('')
const searchType = ref('')
</script>

<template>
  <main>
    <h1>Recherche Pokémon</h1>
    <div class="search-container">
      <div class="input-group">
        <label for="id">ID</label>
        <input
          id="id"
          v-model="searchId"
          type="text"
          placeholder="Entrez l'ID..."
          class="search-input"
        />
      </div>
      <div class="input-group">
        <label for="name">Nom</label>
        <input
          id="name"
          v-model="searchName"
          type="text"
          placeholder="Entrez le nom..."
          class="search-input"
        />
      </div>
      <div class="input-group">
        <label for="type">Type</label>
        <input
          id="type"
          v-model="searchType"
          type="text"
          placeholder="Entrez le type..."
          class="search-input"
        />
      </div>
      <button class="search-button">Rechercher</button>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.search-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}

.search-input {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: #369970;
}
</style>
