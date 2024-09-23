<script setup lang="ts">
import { ref } from 'vue'
import KidizzButton from '@/components/KidizzButton.vue'
import { router } from '@/router'
import { Routes } from '@/interfaces/enum/routes.enum'
import { notifyError } from '@/plugins/toastify'
import { createChildCare } from '@/services/ChildCareService'

const nurseryName = ref('')
const loading = ref(false)

const handleCreateNursery = async () => {
  try {
    loading.value = true
    if (!nurseryName.value) {
      notifyError('Le nom de la crèche est requis.')
      return
    }
    await createChildCare(nurseryName.value)
    router.push({ name: Routes.CHILDCARELISTE })
  } catch (error) {
    notifyError(error)
  } finally {
    loading.value = false
  }
}

const backToChildCareList = () => {
  router.push({name:Routes.CHILDCARELISTE})
}
</script>

<template>
  <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-kidizz-gray-900">
          Ajouter une nouvelle crèche
        </h2>
      </div>
      <div>
        <label for="name" class="sr-only">Nom de la crèche</label>
        <input id="name" name="name" type="text" required v-model="nurseryName"
          class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Nom de la crèche" />
        <KidizzButton @click="handleCreateNursery" class="mt-4 w-full" :is-loading="loading">
          Ajouter une crèche
        </KidizzButton>
        <KidizzButton @click="backToChildCareList" class="mt-4" variant="secondary">
          Retour à la liste
        </KidizzButton>
      </div>
    </div>
  </div>
</template>
