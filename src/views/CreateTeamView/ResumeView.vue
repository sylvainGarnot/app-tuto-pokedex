<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTeamStore } from '@/stores/teamStore'
import PokemonTeamDetail from '@/components/PokemonTeamDetail.vue'

const router = useRouter()

// STORE
const teamStore = useTeamStore()
const currentTeam = computed(() => teamStore.currentTeam)

async function saveTeam() {
  if (!currentTeam.value) return

  try {
    await teamStore.apiPostTeam(currentTeam.value)
    router.push({ name: 'home' })
  } catch {
    // Gérer l'erreur de sauvegarde
  } finally {
    // loading state if needed
  }
}
</script>

<template>
  <main>
    <PokemonTeamDetail v-if="currentTeam?.id" :id="(currentTeam.id as string)" isReadonly />

    <button v-if="currentTeam" @click="saveTeam" class="btn-primary">
      Sauvegarder l'équipe
    </button>
  </main>
</template>

<style scoped lang="scss">
.btn-primary {
  align-self: center;
  width: 100%;
  margin-top: 2rem;
}
</style>
