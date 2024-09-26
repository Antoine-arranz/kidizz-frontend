<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import KidizzButton from '@/components/KidizzButton.vue'
import { notifyError, notifySuccess } from '@/plugins/toastify'
import { Child } from '@/interfaces/Child'
import { router } from '@/router'
import { Routes } from '@/interfaces/enum/routes.enum'
import { getChildrenByChildCare, getOneChildCare } from '@/services/ChildCareService'
import { ChildCare } from '@/interfaces/ChildCare'
import KidizzDialog from '@/components/KidizzDialog.vue'
import { removeChildFromChildCare } from '@/services/ChildService'

const route = useRoute()
const loading = ref(false)
const children = ref<Child[]>([])
const childCare = ref<ChildCare | null>(null)
const childCareId = route.params.id as string

const showDeleteConfirmation = ref(false)
const childToDelete = ref<Child | null>(null)

const fetchChildren = async () => {
  try {
    loading.value = true
    children.value = await getChildrenByChildCare(+childCareId)
  } catch (error) {
    notifyError(error)
  } finally {
    loading.value = false
  }
}

const getChildCareName = async () => {
  try {
    childCare.value = await getOneChildCare(+childCareId)
  } catch (error) {
    notifyError(error)
  }
}

const openDeleteConfirmation = (child: Child) => {
  childToDelete.value = child
  showDeleteConfirmation.value = true
}

const closeDeleteConfirmation = () => {
  showDeleteConfirmation.value = false
  childToDelete.value = null
}

const handleDeleteChild = async () => {
  if (!childToDelete.value) return

  try {
    loading.value = true
    await removeChildFromChildCare(childToDelete.value.id, +childCareId)
    await fetchChildren()
    notifySuccess(
      `L'enfant ${childToDelete.value.firstName} ${childToDelete.value.lastName} a bien été supprimé`
    )
  } catch (error) {
    notifyError(error)
  } finally {
    loading.value = false
    closeDeleteConfirmation()
  }
}

const handleCreateChild = () => {
  router.push({
    name: Routes.ADD_CHILD,
    params: { childCareId }
  })
}

const goToChildList = () => {
  router.push({ name: Routes.CHILD_CARE_LISTE })
}

onMounted(() => {
  getChildCareName()
  fetchChildren()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 class="text-2xl sm:text-3xl text-kidizz-gray-900 mb-4 sm:mb-0">
          Liste des enfants de la crèche <strong>{{ childCare && childCare.name }}</strong>
        </h2>
        <KidizzButton @click="handleCreateChild" :is-loading="loading" class="mr-2">
          Ajouter un enfant
        </KidizzButton>
      </div>

      <div v-if="loading" class="text-center">Chargement des enfants...</div>

      <!-- Liste des enfants -->
      <div v-if="children.length > 0" class="bg-white rounded-lg shadow overflow-hidden">
        <ul class="divide-y divide-gray-200">
          <li
            v-for="child in children"
            :key="child.id"
            class="p-4 flex justify-between items-center"
          >
            <span class="text-lg font-medium text-gray-900">
              {{ child.firstName }} {{ child.lastName }}
            </span>

            <div>
              <KidizzButton variant="danger" size="sm" @click="openDeleteConfirmation(child)">
                Supprimer
              </KidizzButton>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="text-center text-gray-500 mt-4">
        Aucun enfant enregistré pour le moment.
      </div>
      <KidizzButton variant="secondary" size="sm" @click="goToChildList()">
        Retour à la liste des crèches
      </KidizzButton>
    </div>

    <!-- Pop-up de confirmation de suppression -->
    <KidizzDialog
      :show="showDeleteConfirmation"
      title="Confirmer la suppression"
      :message="`Êtes-vous sûr de vouloir supprimer l'enfant ${childToDelete?.firstName} ${childToDelete?.lastName} ? Cette action est irréversible.`"
      @cancel="closeDeleteConfirmation"
      @confirm="handleDeleteChild"
      :is-loading="loading"
    />
  </div>
</template>
