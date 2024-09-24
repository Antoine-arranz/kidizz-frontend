import { User } from '@/interfaces/User'
import { axios } from '@/plugins/axios'

export const findByUsername = async (username: string): Promise<User | null> => {
  const response = await axios.get(`/user?username=${username}`)
  return response.data
}

export const createUser = async ({ username, email }: User): Promise<User> => {
  const response = await axios.put(`/user`, {
    username,
    email
  })
  return response.data
}
