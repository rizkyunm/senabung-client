import HttpFactory from '../factory'
import {
  ICreateAccountInput,
  ICreateAccountResponse,
  ILoginInput,
  ILoginResponse,
} from 'types/auth'
import { IAvailability, IUser } from 'types/user'
import { IErrors } from 'types/errors'

class AuthModule extends HttpFactory {
  private RESOURCE = '/api/v1'

  async login(credentials: ILoginInput): Promise<ILoginResponse | IErrors> {
    return await this.call<ILoginResponse | IErrors>(
      'POST',
      `${this.RESOURCE}/sessions`,
      credentials
    )
  }

  async create(account: ICreateAccountInput): Promise<ICreateAccountResponse> {
    return await this.call<ICreateAccountResponse>(
      'POST',
      `${this.RESOURCE}/users`,
      account
    )
  }

  async session(token: string | null): Promise<IUser> {
    return await this.call<IUser>('GET', `${this.RESOURCE}/me`, undefined, {
      headers: {
        Authorization: token,
      },
    })
  }

  async checkEmailAvailability(email: string): Promise<IAvailability> {
    console.log(email)
    return await this.call<IAvailability>(
      'POST',
      `${this.RESOURCE}/email_checkers`,
      { email }
    )
  }
}

export default AuthModule
