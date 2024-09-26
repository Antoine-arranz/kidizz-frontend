<script setup lang="ts">
import { ref } from 'vue'
import KidizzButton from '@/components/KidizzButton.vue'
import KidizzInput from '@/components/KidizzInput.vue'
import { router } from '@/router'
import { Routes } from '@/interfaces/enum/routes.enum'
import { notifyError } from '@/plugins/toastify'
import { createChildCare } from '@/services/ChildCareService'
import { noSpecialCharacter } from '@/functions/noSpecialCharacter'

const childCareName = ref('')
const loading = ref(false)

const handleCreateChildCare = async () => {
  try {
    loading.value = true
    if (!childCareName.value) {
      notifyError('Le nom de la crèche est requis.')
      return
    }
    if (noSpecialCharacter(childCareName.value)) {
      await createChildCare(childCareName.value)
      router.push({ name: Routes.CHILD_CARE_LISTE })
    }
  } catch (error) {
    notifyError(error)
  } finally {
    loading.value = false
  }
}

const backToChildCareList = () => {
  router.push({ name: Routes.CHILD_CARE_LISTE })
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
        <KidizzInput
          id="name"
          type="text"
          v-model="childCareName"
          placeholder="Nom de la crèche"
        ></KidizzInput>
        <KidizzButton @click="handleCreateChildCare" class="mt-4 w-full" :is-loading="loading">
          Ajouter une crèche
        </KidizzButton>
        <KidizzButton @click="backToChildCareList" class="mt-4" variant="secondary">
          Retour à la liste
        </KidizzButton>
      </div>
    </div>
  </div>
</template>
