<script setup>
import { ref } from 'vue'
import KidizzButton from '@/components/Button.vue'
import KidizzInput from '@/components/Input.vue'

const username = ref('')
const email = ref('')
const isNewUser = ref(false)
const isLoggedIn = ref(false)
const loggedInUser = ref('')

const checkUser = async () => {
  // Simuler une vérification d'utilisateur
  const userExists = await fakeUserCheck(username.value)
  if (userExists) {
    loginUser(username.value)
  } else {
    isNewUser.value = true
  }
}

const createUser = async () => {
  // Simuler la création d'un utilisateur
  await fakeCreateUser(username.value, email.value)
  loginUser(username.value)
}

const loginUser = (user) => {
  isLoggedIn.value = true
  loggedInUser.value = user
  // Ici, vous pourriez stocker l'utilisateur dans le localStorage ou un store global
}

// Ces fonctions simulent des appels API
const fakeUserCheck = (user) =>
  new Promise((resolve) => setTimeout(() => resolve(Math.random() > 0.5), 500))
const fakeCreateUser = (user, email) => new Promise((resolve) => setTimeout(resolve, 500))
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
      <div v-if="!isLoggedIn" class="mt-8 space-y-6">
        <div v-if="!isNewUser">
          <KidizzInput v-model="username" placeholder="Nom d'utilisateur" type="text" />
          <KidizzButton @click="checkUser" class="mt-4 w-full" variant="primary" size="md">
            Se connecter
          </KidizzButton>
        </div>
        <div v-else>
          <KidizzInput v-model="email" placeholder="Email" type="email" />
          <KidizzButton @click="createUser" class="mt-4 w-full" variant="secondary" size="md">
            Créer un compte
          </KidizzButton>
        </div>
      </div>
      <div v-else class="text-center">
        <p class="text-2xl font-bold text-kidizz-gray-900">Bonjour, {{ loggedInUser }} !</p>
        <p class="mt-2 text-kidizz-gray-600">Vous êtes maintenant connecté à Kidizz.</p>
      </div>
    </div>
  </div>
</template>
