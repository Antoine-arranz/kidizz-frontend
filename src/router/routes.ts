import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound,
    meta: {
      isPublic: true
    }
  }
]

export default routes
