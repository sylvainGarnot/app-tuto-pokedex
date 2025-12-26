<script setup lang="ts">
import { computed } from 'vue'
import { useTeamStore } from '../stores/teamStore'

const teamStore = useTeamStore()
const team = computed(() => teamStore.currentTeam)

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
</script>

<template>
  <main>
    <h1 v-if="team">Ajouter des Pokémons à {{ team.name }}</h1>

    <div class="team-info" v-if="team">
      <p><strong>Nom :</strong> {{ team.name }}</p>
      <p v-if="team.subname"><strong>Sous-titre :</strong> {{ team.subname }}</p>
      <p><strong>Créée le :</strong> {{ formatDate(team.createdAt) }}</p>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.team-info {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.team-info p {
  margin: 0.75rem 0;
  color: #333;
  font-size: 1rem;
}

.team-info strong {
  color: #666;
  font-weight: 600;
}
</style>
