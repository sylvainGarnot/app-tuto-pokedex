<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTeamStore } from '@/stores/teamStore'

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
    <button v-if="currentTeam" @click="saveTeam" class="btn-primary">
      Sauvegarder l'équipe
    </button>
  </main>
</template>

<style scoped lang="scss">
</style>
