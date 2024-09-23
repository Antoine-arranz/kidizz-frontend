<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import KidizzButton from '@/components/KidizzButton.vue'
import { router } from '@/router'
import { Routes } from '@/interfaces/enum/routes.enum'
import { notifyError } from '@/plugins/toastify'
import { deleteChildCare, getAllChildCares } from '@/services/ChildCareService'
import { ChildCare } from '@/interfaces/ChildCare'
import { useRoute } from 'vue-router'
import KidizzDialog from '@/components/KidizzDialog.vue'

const loading = ref(false)
const deleteLoader = ref(false)
const childCares = ref<ChildCare[]>([])
const route = useRoute()
const showDeleteConfirmation = ref(false)
const childCareToDelete = ref<ChildCare | null>(null)

const handleCreateChildCare = () => {
  router.push({ name: Routes.ADD_CHILD_CARE })
}

const handleDeleteChildCare = async (): Promise<void> => {
  try {
    if (childCareToDelete.value) {
      deleteLoader.value = true
      await deleteChildCare(childCareToDelete.value.id)
      await fetchChildCares()
    }
  } catch (error) {
    notifyError(error)
  } finally {
    deleteLoader.value = false
    closeDeleteConfirmation()
  }
}
const fetchChildCares = async () => {
  try {
    loading.value = true
    childCares.value = await getAllChildCares()
  } catch (error) {
    notifyError('Erreur lors du chargement des crèches')
  } finally {
    loading.value = false
  }
}

const goToChildList = (childCareId: number) => {
  router.push({ name: Routes.CHILD_LIST, params: { id: childCareId } })
}
const openDeleteConfirmation = (childCare: ChildCare) => {
  childCareToDelete.value = childCare
  showDeleteConfirmation.value = true
}

const closeDeleteConfirmation = () => {
  showDeleteConfirmation.value = false
  childCareToDelete.value = null
}
watch(
  () => route.name,
  () => {
    if (route.name === Routes.CHILD_CARE_LISTE) {
      fetchChildCares()
    }
  }
)

onMounted(fetchChildCares)
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-extrabold text-kidizz-gray-900">Liste des crèches</h2>
        <KidizzButton @click="handleCreateChildCare" :is-loading="loading">
          Créer une nouvelle crèche
        </KidizzButton>
      </div>

      <div v-if="loading" class="text-center">Chargement des crèches...</div>

      <!-- Liste des crèches -->
      <div v-if="childCares.length > 0" class="bg-white rounded-lg shadow overflow-hidden">
        <ul class="divide-y divide-gray-200">
          <li
            v-for="childCare in childCares"
            :key="childCare.id"
            class="p-4 flex justify-between items-center"
          >
            <span class="text-lg font-medium text-gray-900">{{ childCare.name }}</span>
            <div>
              <KidizzButton
                @click="goToChildList(childCare.id)"
                class="mr-2"
                variant="secondary"
                size="sm"
              >
                Voir détails
              </KidizzButton>
              <KidizzButton
                @click="openDeleteConfirmation(childCare)"
                variant="danger"
                size="sm"
                :is-loading="deleteLoader"
              >
                Supprimer
              </KidizzButton>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="text-center text-gray-500 mt-4">
        Aucune crèche enregistrée pour le moment.
      </div>
    </div>
    <!-- Pop-up de confirmation de suppression -->
    <KidizzDialog
      :show="showDeleteConfirmation"
      title="Confirmer la suppression"
      :message="`Êtes-vous sûr de vouloir supprimer la crêche ${childCareToDelete?.name} ? Cette action est irréversible.`"
      @cancel="closeDeleteConfirmation"
      @confirm="handleDeleteChildCare"
      :is-loading="loading"
    />
  </div>
</template>
