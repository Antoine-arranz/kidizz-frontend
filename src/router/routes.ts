import { Routes } from '@/interfaces/enum/routes.enum';
import Login from '@/views/Login.vue';
import NotFound from '@/views/NotFound.vue';
import ChildCareList from '@/views/ChildCareList.vue';

export const routes = [
  {
    path: '/',
    name: Routes.HOME,
    component: Login,
    meta: {
      isPublic: true
    }
  },
    {
    path: '/childcares',
    name: Routes.CHILDCARELISTE,
    component: ChildCareList,
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
