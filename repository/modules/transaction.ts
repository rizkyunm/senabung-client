import HttpFactory from '../factory'
import {
  ICreateTransactionInput,
  ICreateTransactionResponse,
  ITransaction,
} from '~/types/transaction'

class TransactionModule extends HttpFactory {
  private RESOURCE = '/api/v1'

  async create(
    token: string | null,
    transaction: ICreateTransactionInput
  ): Promise<ICreateTransactionResponse> {
    return await this.call<ICreateTransactionResponse>(
      'POST',
      `${this.RESOURCE}/transactions`,
      transaction,
      {
        headers: {
          Authorization: token,
        },
      }
    )
  }

  async listByUser(token: string | null): Promise<ITransaction[]> {
    return await this.call<ITransaction[]>(
      `GET`,
      `${this.RESOURCE}/transactions`,
      undefined,
      {
        headers: {
          Authorization: token,
        },
      }
    )
  }

  async listByCampaign(
    campaign_id: number
  ): Promise<ITransaction[]> {
    return await this.call<ITransaction[]>(
      `GET`,
      `${this.RESOURCE}/campaigns/${campaign_id}/transactions`,
      undefined
    )
  }
}

export default TransactionModule
