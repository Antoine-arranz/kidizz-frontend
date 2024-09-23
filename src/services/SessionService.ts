import { User } from '@/interfaces/User'

export const storeUserInSession = (user: User) => {
  sessionStorage.setItem('user', JSON.stringify(user))
}

export const getUserFromSession = (): User | null => {
  const user = sessionStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const clearUserSession = () => {
  sessionStorage.removeItem('user')
}
