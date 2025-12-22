<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './layout/AppHeader.vue'
import AppFooter from './layout/AppFooter.vue'
</script>



<style scoped>
</style>
