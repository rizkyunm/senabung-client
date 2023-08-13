import HttpFactory from '../factory'
import { IUploadStatus, IUser } from 'types/user'

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

  async avatar(token: string | null, formData: [File]): Promise<IUploadStatus> {
    return await this.call<IUploadStatus>(
      'POST',
      `${this.RESOURCE}/avatars`,
      formData,
      {
        headers: {
          Authorization: token,
        },
      }
    )
  }
}

export default UserModule
