import axios, { AxiosError } from 'axios'
import { notifyError } from './toastify'
interface ApiErrorResponse {
  message: string | string[]
}

/** The axios instance */
const instance = axios.create({
  withCredentials: false,
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
const DEFAULT_ERROR_MESSAGE = 'Une erreur inconnue est survenu'

instance.interceptors.response.use(undefined, (error: AxiosError) => {
  let errorMessage: string

  if (!error.response) {
    // Si aucune erreur est présente on utilise un message par défaut
    errorMessage = DEFAULT_ERROR_MESSAGE
    notifyError(DEFAULT_ERROR_MESSAGE)
  } else {
    const data = error.response.data as ApiErrorResponse

    errorMessage = Array.isArray(data.message)
      ? data.message[0]
      : data.message || DEFAULT_ERROR_MESSAGE
  }
  throw new Error(errorMessage)
})

export { instance as axios }
