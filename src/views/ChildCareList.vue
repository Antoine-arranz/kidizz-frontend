<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import KidizzButton from '@/components/KidizzButton.vue'
import { router } from '@/router'
import { Routes } from '@/interfaces/enum/routes.enum'
import { notifyError, notifySuccess } from '@/plugins/toastify'
import { deleteChildCare, getAllChildCares } from '@/services/ChildCareService'
import { ChildCare } from '@/interfaces/ChildCare'
import { useRoute } from 'vue-router'
import KidizzDialog from '@/components/KidizzDialog.vue'
import { getExport } from '@/services/ChildService'
import CsvIcon from '@/assets/csv.svg'

const loading = ref(false)
const deleteLoader = ref(false)
const childCares = ref<ChildCare[]>([])
const route = useRoute()
const showDeleteConfirmation = ref(false)
const childCareToDelete = ref<ChildCare | null>(null)
const exportLoading = ref(false)

const handleCreateChildCare = () => {
  router.push({ name: Routes.ADD_CHILD_CARE })
}

const handleDeleteChildCare = async (): Promise<void> => {
  try {
    if (childCareToDelete.value) {
      deleteLoader.value = true
      await deleteChildCare(childCareToDelete.value.id)
      await fetchChildCares()
      notifySuccess(`La crèche ${childCareToDelete.value.name} a bien été supprimée`)
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

const handleExportCsv = async (childcareId?: number) => {
  try {
    exportLoading.value = true
    await getExport(childcareId)
  } catch (error) {
    notifyError(error)
  } finally {
    exportLoading.value = false
  }
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
  <div class="flex flex-col items-center justify-center py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-full lg:max-w-4xl w-full space-y-6 sm:space-y-8 bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-kidizz-gray-900 mb-4 sm:mb-0">Liste des crèches</h2>
        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <KidizzButton @click="handleCreateChildCare" variant="primary" class="w-full sm:w-auto">
            Créer une nouvelle crèche
          </KidizzButton>
          <KidizzButton @click="handleExportCsv()" variant="secondary" class="flex items-center w-full sm:w-auto"
            title="Exporter toutes les crèches">
            <img :src="CsvIcon" alt="CSV Icon" class="w-5 h-5 mr-2" />
            Exporter tout
          </KidizzButton>
        </div>
      </div>

      <div v-if="loading" class="text-center">Chargement des crèches...</div>

      <!-- Liste des crèches -->
      <div v-if="childCares.length > 0" class="bg-white rounded-lg shadow overflow-hidden">
        <ul class="divide-y divide-gray-200">
          <li v-for="childCare in childCares" :key="childCare.id"
            class="p-4 flex justify-between items-center sm:items-center hover:bg-gray-50 flex-row cursor-pointer"
            @click="goToChildList(childCare.id)">
            <span class="text-lg font-medium text-gray-900">{{ childCare.name }}</span>
            <div class="flex mt-4 sm:mt-0 m-0 flex-col sm:flex-row gap-2 sm:gap-4">
              <KidizzButton @click.stop="goToChildList(childCare.id)" variant="secondary" size="sm"
                class="w-full m-0 sm:w-auto">
                Voir détails
              </KidizzButton>

              <KidizzButton @click.stop="openDeleteConfirmation(childCare)" variant="danger" size="sm"
                :is-loading="deleteLoader" class="w-full sm:w-auto ml-0">
                Supprimer
              </KidizzButton>

              <KidizzButton @click.stop="handleExportCsv(childCare.id)" variant="primary" size="sm"
                class="flex justify-center items-center w-full sm:w-auto px-0.5 py-0.5" :title="`Exporter ${childCare.name}`"
                :is-loading="exportLoading">
                <img :src="CsvIcon" alt="CSV Icon" class="w-6 h-6" />
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
    <KidizzDialog :show="showDeleteConfirmation" title="Confirmer la suppression"
      :message="`Êtes-vous sûr de vouloir supprimer la crèche ${childCareToDelete?.name} ? Cette action est irréversible.`"
      @cancel="closeDeleteConfirmation" @confirm="handleDeleteChildCare" :is-loading="loading" />
  </div>
</template>
