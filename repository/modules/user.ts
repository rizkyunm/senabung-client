import HttpFactory from '../factory'
import { IUser } from 'types/user'

class UserModule extends HttpFactory {
  private RESOURCE = '/api/v1'

  async list(token: string | null): Promise<IUser[]> {
    return await this.call<IUser[]>(
      'GET',
      `${this.RESOURCE}/users`,
      undefined,
      {
        headers: {
          Authorization: token,
        },
      }
    )
  }
}

export default UserModule
