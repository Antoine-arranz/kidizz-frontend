<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import KidizzButton from '@/components/KidizzButton.vue'
import { notifyError } from '@/plugins/toastify'
import { createChild, searchChildByName } from '@/services/ChildService'
import { Routes } from '@/interfaces/enum/routes.enum'
import { ChildCare } from '@/interfaces/ChildCare'
import { Child } from '@/interfaces/Child'
import { getOneChildCare } from '@/services/ChildCareService'
import KidizzInput from '@/components/KidizzInput.vue'

const route = useRoute()
const router = useRouter()
const childCare = ref<ChildCare | null>(null)
const childCareId = +route.params.id
const firstName = ref('')
const lastName = ref('')
const searchQuery = ref('')
const searchResults = ref<Child[]>([])
const selectedChild = ref<Child | null>(null)
const loading = ref(false)
const activeTab = ref('create')

const handleCreateChild = async () => {
  try {
    loading.value = true
    if (!firstName.value || !lastName.value) {
      notifyError('Le prénom et le nom de lenfant sont requis.')
      return
    }
    await createChild({ firstName: firstName.value, lastName: lastName.value, childCareId })
    router.push({ name: Routes.CHILD_LIST, params: { id: childCareId } })
  } catch (error) {
    notifyError(error)
  } finally {
    loading.value = false
  }
}

const handleSearchChild = async () => {
  try {
    if (!searchQuery.value) {
      throw Error('Veuillez indiquer un nom')
    }
    loading.value = true
    searchResults.value = await searchChildByName(searchQuery.value)
    if (!searchResults.value.length) {
      notifyError('Aucun enfant trouvé, créez un nouvel enfant')
    }
  } catch (error) {
    notifyError(error)
    searchResults.value = []
  } finally {
    loading.value = false
  }
}

const selectChild = (child: Child) => {
  selectedChild.value = child
}

const handleAssociateChild = async () => {
  try {
    loading.value = true
    if (!selectedChild.value) {
      notifyError('Veuillez sélectionner un enfant.')
      return
    }
    // await associateChildWithDaycare(selectedChild.value.id, daycareId)
    router.push({ name: Routes.CHILD_LIST, params: { id: childCareId } })
  } catch (error) {
    notifyError(error)
  } finally {
    loading.value = false
  }
}

const getChildCareName = async () => {
  try {
    childCare.value = await getOneChildCare(childCareId)
  } catch (error) {
    notifyError(error)
  }
}

const backToChildList = () => {
  router.push({ name: Routes.CHILD_LIST, params: { id: childCareId } })
}

onMounted(() => {
  getChildCareName()
})
</script>

<template>
  <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl text-kidizz-gray-900 font-semibold">
          Ajouter un enfant dans la crèche <br /><strong class="text-kidizz-primary">{{
            childCare && childCare.name
          }}</strong>
        </h2>
      </div>

      <div class="flex justify-center space-x-4 mb-6">
        <button
          @click="activeTab = 'create'"
          :class="[
            'px-4 py-2 rounded-md transition-all duration-300 ease-in-out',
            activeTab === 'create'
              ? 'bg-kidizz-blue-100 shadow-md'
              : 'bg-gray-100 text-kidizz-gray-700 hover:bg-gray-200'
          ]"
        >
          Créer un nouvel enfant
        </button>
        <button
          @click="activeTab = 'associate'"
          :class="[
            'px-4 py-2 rounded-md transition-all duration-300 ease-in-out',
            activeTab === 'associate'
              ? 'bg-kidizz-blue-100 shadow-md'
              : 'bg-gray-100 text-kidizz-gray-700 hover:bg-gray-200'
          ]"
        >
          Ajouter un enfant existant
        </button>
      </div>

      <div v-if="activeTab === 'create'" class="space-y-4">
        <KidizzInput id="firstName" v-model="firstName" placeholder="Prénom de l'enfant" required />
        <KidizzInput id="lastName" v-model="lastName" placeholder="Nom de l'enfant" required />
        <KidizzButton @click="handleCreateChild" class="w-full" :is-loading="loading">
          Ajouter un enfant
        </KidizzButton>
      </div>

      <div v-if="activeTab === 'associate'" class="space-y-4">
        <div class="flex space-x-2">
          <KidizzInput v-model="searchQuery" placeholder="Rechercher un enfant par nom" />
          <KidizzButton @click="handleSearchChild" :is-loading="loading"> Rechercher </KidizzButton>
        </div>

        <div v-if="searchResults.length > 0" class="mt-4 bg-gray-50 rounded-md p-2">
          <ul class="divide-y divide-gray-200">
            <li
              v-for="child in searchResults"
              :key="child.id"
              class="py-2 px-3 flex cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
              @click="selectChild(child)"
              :class="{
                'bg-kidizz-primary bg-opacity-20': selectedChild && selectedChild.id === child.id
              }"
            >
              <div :class="{ 'font-semibold': selectedChild && selectedChild.id === child.id }">
                Prénom : {{ child.firstName }} Nom : {{ child.lastName }} identifiant:
                {{ child.id }}
              </div>
            </li>
          </ul>
        </div>

        <KidizzButton
          v-if="selectedChild"
          @click="handleAssociateChild"
          class="w-full"
          :is-loading="loading"
        >
          Associer l'enfant à la crèche
        </KidizzButton>
      </div>

      <KidizzButton @click="backToChildList" class="mt-6" variant="secondary">
        Retour à la liste des enfants
      </KidizzButton>
    </div>
  </div>
</template>
