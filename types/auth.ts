import { IUser } from '~/types/user'

export enum Role {
  Admin = 'admin',
  Client = 'client',
}

export interface ICreateAccountInput {
  name: string
  email: string
  phone_number: string
  password: string
  role: Role
}

export interface ICreateAccountResponse {
  id?: string
}

export interface ILoginInput {
  email: string
  password: string
}

export interface ILoginResponse extends IUser {
  token: string
}
