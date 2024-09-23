<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import KidizzButton from '@/components/KidizzButton.vue'
import { router } from '@/router'
import { Routes } from '@/interfaces/enum/routes.enum'
import { notifyError } from '@/plugins/toastify'
import { deleteChildCare, getAllChildCares } from '@/services/ChildCareService'
import { ChildCare } from '@/interfaces/ChildCare'
import { useRoute } from 'vue-router'

const loading = ref(false)
const deleteLoader = ref(false)
const childCares = ref<ChildCare[]>([])
const route = useRoute()



const handleCreateNursery = () => {
    router.push({ name: Routes.ADD_CHILD_CARE })
}

const handleDeleteNursery = async (id: number) => {
    try {
        deleteLoader.value = true
        await deleteChildCare(id)
        await fetchChildCares()
    } catch (error) {
        notifyError(error)
    } finally {
        deleteLoader.value = false
    }
}
const fetchChildCares = async () => {
    try {
        loading.value = true
        childCares.value = await getAllChildCares()
    } catch (error) {
        notifyError("Erreur lors du chargement des crèches")
    } finally {
        loading.value = false
    }
}

watch(() => route.name, () => {
    if (route.name === Routes.CHILDCARELISTE) {
        fetchChildCares()
    }
})

onMounted(fetchChildCares)
</script>

<template>
    <div class="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-extrabold text-kidizz-gray-900">Liste des crèches</h2>
                <KidizzButton @click="handleCreateNursery" :is-loading="loading">
                    Créer une nouvelle crèche
                </KidizzButton>
            </div>

            <div v-if="loading" class="text-center">
                Chargement des crèches...
            </div>

            <!-- Liste des crèches -->
            <div v-if="childCares.length > 0" class="bg-white rounded-lg shadow overflow-hidden">
                <ul class="divide-y divide-gray-200">
                    <li v-for="childCare in childCares" :key="childCare.id"
                        class="p-4 flex justify-between items-center">
                        <span class="text-lg font-medium text-gray-900">{{ childCare.name }}</span>
                        <div>
                            <KidizzButton class="mr-2" variant="secondary" size="sm">
                                Voir détails
                            </KidizzButton>
                            <KidizzButton @click="handleDeleteNursery(childCare.id)" variant="danger" size="sm" :is-loading="deleteLoader">
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
    </div>
</template>
