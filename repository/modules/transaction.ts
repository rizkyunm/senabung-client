import HttpFactory from '../factory'
import {
  ICreateTransactionInput,
  ICreateTransactionResponse,
} from '~/types/transaction'

class TransactionModule extends HttpFactory {
  private RESOURCE = '/api/v1'

  async create(
    transaction: ICreateTransactionInput
  ): Promise<ICreateTransactionResponse> {
    return await this.call<ICreateTransactionResponse>(
      'POST',
      `${this.RESOURCE}/transactions`,
      transaction
    )
  }
}

export default TransactionModule
