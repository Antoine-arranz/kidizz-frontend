import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import {getUserFromSession} from '@/services/SessionService'
import { Routes } from '@/interfaces/enum/routes.enum'
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userSession = getUserFromSession() 

  if (!userSession && to.path !== '/') {
    // Si pas d'utilisateur et la route n'est pas '/', redirigez vers '/'
    next({name : Routes.HOME})
  } else if (userSession && to.path === '/') {
    next({name : Routes.CHILDCARELISTE})
  } else {
    next()
  }
})

export { router }
