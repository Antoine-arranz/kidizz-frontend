<template>
    <header class="bg-white shadow-md">
        <div class="mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div class="flex items-center">
                <img class="h-8 w-auto mr-4" src="https://app.kidizz.com/assets/brand/logo-kidizz.png"
                    alt="Kidizz Logo" />
                <h1 class="text-xl font-semibold text-kidizz-gray-900">Bonjour {{ user?.username }}</h1>
            </div>
            <KidizzButton @click="handleLogout" variant="secondary" size="sm">
                Déconnexion
            </KidizzButton>
        </div>
    </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import KidizzButton from '@/components/KidizzButton.vue'
import { clearUserSession, getUserFromSession } from '@/services/SessionService'
import { router } from '@/router'
import { Routes } from '@/interfaces/enum/routes.enum'


const user = computed(() => {
    return getUserFromSession()
})
const handleLogout = () => {
    try {
        clearUserSession() 
        router.push({ name: Routes.HOME }) 
    } catch (error) {
        console.error('Erreur lors de la déconnexion', error)
    }
}
</script>