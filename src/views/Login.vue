<script setup lang="ts">
import { ref } from 'vue'
import KidizzButton from '@/components/KidizzButton.vue'
import { findByUsername, createUser } from '@/services/UserService'
import { router } from '@/router'
import { Routes } from '@/interfaces/enum/routes.enum'
import { storeUserInSession } from '@/services/SessionService'
import {notifyError}from '@/plugins/toastify'
const username = ref('')
const email = ref('')
const isNewUser = ref(false)
const loading = ref(false)

const checkUser = async () => {
  try {
    loading.value = true
    const user = await findByUsername(username.value)
    if (user) {
      await storeUserInSession(user)
      router.push(Routes.CHILDCARELISTE)
    }
    isNewUser.value = true
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const handleCreateUser = async () => {
  try {
    loading.value = true
    const newUser = await createUser({ username: username.value, email: email.value })
    await storeUserInSession(newUser)
    router.push(Routes.CHILDCARELISTE)
  } catch (error) {
    notifyError(error);
  } finally {
    loading.value = false
  }
}

const showUserNameSelection = () => {
  isNewUser.value = false
}
</script>

<template>
  <div
    class="min-h-screen bg-kidizz-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://app.kidizz.com/assets/brand/logo-kidizz.png"
          alt="Kidizz Logo"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-kidizz-gray-900">
          Bienvenue chez Kidizz
        </h2>
      </div>
      <div>
        <div v-if="!isNewUser">
          <label for="username" class="sr-only">Nom d'utilisateur</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            v-model="username"
            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Nom d'utilisateur"
          />
          <KidizzButton @click="checkUser" class="mt-4 w-full" :is-loading="loading">
            Se connecter
          </KidizzButton>
        </div>
        <div v-else>
          <p>
            Bonjour <strong>{{ username }}</strong
            >. Veuillez indiquer votre addresse email pour creer un compte
          </p>
          <label for="email" class="sr-only mt-4">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            v-model="email"
            class="appearance-none rounded-md relative block mt-4 w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email"
          />
          <KidizzButton
            @click="handleCreateUser"
            class="mt-4 w-full"
            variant="secondary"
            size="md"
            :is-loading="loading"
          >
            Créer un compte
          </KidizzButton>
          <KidizzButton
            @click="showUserNameSelection"
            class="mt-4"
            variant="primary"
            size="sm"
            :is-loading="loading"
          >
            Essayer avec un autre utilisateur
          </KidizzButton>
        </div>
      </div>
    </div>
  </div>
</template>
