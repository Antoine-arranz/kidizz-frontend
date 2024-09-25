import { Child, CreateChildParams } from '@/interfaces/Child'
import { axios } from '@/plugins/axios'
import { getUserFromSession } from './SessionService'

export const createChild = async (params: CreateChildParams): Promise<void> => {
  const user = await getUserFromSession()

  const { firstName, lastName, childCareId } = params
  if (user) {
    await axios.post(
      '/child',
      {
        firstName,
        lastName,
        childCareId
      },
      {
        headers: {
          'X-Auth': user.username
        }
      }
    )
  }
}

export const removeChildFromChildCare = async (
  childId: number,
  childCareId: number
): Promise<void> => {
  const user = await getUserFromSession()
  if (user) {
    await axios.delete(
      `/child/${childCareId}/child/${childId}`,

      {
        headers: {
          'X-Auth': user.username
        }
      }
    )
  }
}

export const searchChildByName = async (name: string): Promise<Child[] | []> => {
  const response = await axios.get(`/child/search?name=${name}`)
  console.log(response)
  return response.data
}

export const associateChildWithDaycare = async (
  childId: number,
  childCareId: number
): Promise<void> => {
  await axios.post(`/child/${childId}/associate/${childCareId}`)
}

export const getExport = async (childCareId?: number) => {
  const response = await axios.get('/child/export.csv', {
    params: { childCareId },
    responseType: 'blob'
  })

  const contentDisposition = response.headers['content-disposition']
  let fileName = 'export.csv'

  if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/i)
    if (fileNameMatch.length === 2) fileName = fileNameMatch[1]
  }
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  link.remove()
}
