import { ChildCare } from './ChildCare'
import { User } from './User'

export interface Child {
  id: number
  firstName: string
  lastName: string
  creator: User
  childCares: ChildCare[]
}

export interface CreateChildParams {
  firstName: string
  lastName: string
  childCareId: number
}
