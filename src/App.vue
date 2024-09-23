<template>
  <div class="flex flex-col min-h-screen bg-kidizz-blue-100">
    <Header v-if="!isHomePage"> </Header>

    <main>
      <RouterView v-slot="{ Component }">
        <component :is="Component"></component>
      </RouterView>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { Routes } from './interfaces/enum/routes.enum'
import Header from '@/components/layout/Header.vue'
const route = useRoute()
const isHomePage = computed(() => {
  return route.name === Routes.HOME
})
</script>
