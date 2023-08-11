export interface ICreateTransactionInput {
  amount: number
  campaign_id: number
}

export interface ICreateTransactionResponse {
  id: number
  campaign_id: number
  amount: number
  status: string
  code?: string
  payment_url: string
}
