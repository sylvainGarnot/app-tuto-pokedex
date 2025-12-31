<template>
  <TheHeader />
  <main id="main-content">
    <RouterView />
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './layout/TheHeader.vue'
import TheFooter from './layout/TheFooter.vue'
</script>



<style scoped lang="scss">
#main-content {
  padding: 2rem;
  max-width: 1480px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 1rem;
  }

  border: red solid 1px;
}
</style>
