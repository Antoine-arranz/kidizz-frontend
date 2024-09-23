<script setup lang="ts">
import { ref } from 'vue'
import KidizzButton from '@/components/KidizzButton.vue'
import KidizzInput from '@/components/KidizzInput.vue'

import { findByUsername, createUser } from '@/services/UserService'
import { router } from '@/router'
import { Routes } from '@/interfaces/enum/routes.enum'
import { storeUserInSession } from '@/services/SessionService'
import { notifyError } from '@/plugins/toastify'
const username = ref('')
const email = ref('')
const isNewUser = ref(false)
const loading = ref(false)

const checkUser = async () => {
  try {
    if (!username.value) {
      notifyError(`Nom d'utilisateur obligatoire`)
      return
    }
    loading.value = true
    const user = await findByUsername(username.value)
    if (user) {
      await storeUserInSession(user)
      router.push({ name: Routes.CHILD_CARE_LISTE })
    }
    isNewUser.value = true
  } catch (error) {
    notifyError(error)
  } finally {
    loading.value = false
  }
}

const handleCreateUser = async () => {
  try {
    loading.value = true
    const newUser = await createUser({ username: username.value, email: email.value })
    await storeUserInSession(newUser)
    router.push({ name: Routes.CHILD_CARE_LISTE })
  } catch (error) {
    notifyError(error)
  } finally {
    loading.value = false
  }
}

const showUserNameSelection = () => {
  isNewUser.value = false
}
</script>

<template>
  <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
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
          <KidizzInput
            id="username"
            type="text"
            v-model="username"
            placeholder="Nom d'utilisateur"
          ></KidizzInput>
          <KidizzButton @click="checkUser" class="mt-4 w-full" :is-loading="loading">
            Se connecter
          </KidizzButton>
        </div>
        <div v-else>
          <p>
            Bonjour <strong>{{ username }}</strong
            >. Veuillez indiquer votre adresse email pour créer un compte
          </p>
          <label for="email" class="sr-only mt-4">Email</label>
          <KidizzInput id="email" type="email" v-model="email" placeholder="Email"></KidizzInput>
          <KidizzButton
            @click="handleCreateUser"
            class="mt-4 w-full"
            variant="secondary"
            size="md"
            :is-loading="loading"
          >
            Créer un compte
          </KidizzButton>
          <KidizzButton @click="showUserNameSelection" class="mt-4" variant="primary" size="sm">
            Essayer avec un autre utilisateur
          </KidizzButton>
        </div>
      </div>
    </div>
  </div>
</template>
