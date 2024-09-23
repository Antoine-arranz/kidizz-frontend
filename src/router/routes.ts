import { Routes } from '@/interfaces/enum/routes.enum'
import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'
import ChildCareList from '@/views/ChildCareList.vue'
import AddChildCare from '@/views/AddChildCare.vue'
import ChildList from '@/views/ChildList.vue'
import AddChild from '@/views/AddChild.vue'


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
    name: Routes.NOT_FOUND,
    component: NotFound,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/addChildCare',
    name: Routes.ADD_CHILD_CARE,
    component: AddChildCare,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/childCare/:id',
    name: Routes.CHILD_LIST,
    component: ChildList,
    meta: {
      isPublic: true
    }
  },
   {
    path: '/addChild/:id',
    name: Routes.ADD_CHILD,
    component: AddChild,
    meta: {
      isPublic: true
    }
  }
]

export default routes
