import { ChildCare } from "./ChildCare";
import { User } from "./User";

export interface Child {
    id: number,
    firstName: string,
    lastName: string,
    creator: User,
    daycares : ChildCare[]
}

export interface CreateChildParams {
  firstName: string;
  lastName: string;
  daycareId: number;
}