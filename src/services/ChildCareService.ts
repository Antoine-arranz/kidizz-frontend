// UserService.ts
import { User } from '@/interfaces/User'
import { axios } from '@/plugins/axios'
import { getUserFromSession } from './SessionService'
import { ChildCare } from '@/interfaces/ChildCare'
import { Child } from '@/interfaces/Child'

export const createChildCare = async (name: string): Promise<void> => {
  const user = await getUserFromSession()
  if (user) {
    await axios.post(
      `/child-cares`,
      { name },
      {
        headers: {
          'X-Auth': user.username
        }
      }
    )
  } else {
    throw new Error('Utilisateur introuvable')
  }
}

export const getAllChildCares = async (): Promise<ChildCare[]> => {
  const response = await axios.get(`/child-cares`)
  return response.data
}

export const deleteChildCare = async (childCareId: number): Promise<void> => {
  const user = await getUserFromSession()
  if (user) {
    await axios.delete(`/child-cares/${childCareId}`, {
      headers: {
        'X-Auth': user.username
      }
    })
  }
}

export const getChildrenByChildCare = async (childCareId: number): Promise<Child[]> => {
  const response = await axios.get(`/child-cares/${childCareId}/children`, {})
  return response.data
}

export const getOneChildCare = async (childCareId: number): Promise<ChildCare | null> => {
  const response = await axios.get(`/child-cares/${childCareId}`)
  return response.data
}
