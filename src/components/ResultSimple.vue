<script setup lang="ts">
import type { Pokemon } from '../types/pokemon'

defineProps<{
  result: Pokemon | null
  error: string
}>()
</script>

<template>
  <div v-if="error" class="error">{{ error }}</div>

  <div v-if="result" class="result">
    <div class="pokemon-card">
      <span class="pokemon-id">{{ result.id }}</span>
      <span class="pokemon-name">{{ result.name }}</span>
      <img v-if="result.sprite" :src="result.sprite" :alt="result.name" class="pokemon-sprite" />
      <div v-if="result.types && result.types.length > 0" class="types-icons">
        <img v-for="type in result.types" :key="type.name" :src="type.image" :alt="type.name" class="type-icon" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.error {
  background-color: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.result {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pokemon-card {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .pokemon-card {
    flex-direction: column;
    gap: 1.5rem;
  }
}

.pokemon-id {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  min-width: 50px;
}

.pokemon-name {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  min-width: 100px;
}

.pokemon-sprite {
  max-width: 100px;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.pokemon-sprite:hover {
  transform: scale(1.05);
}

.types-icons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-left: auto;
}

.type-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
</style>
