export interface ICreateTransactionInput {
  amount: number
  campaign_id: number
}

export interface ICreateTransactionResponse {
  id: number
  order_no: string
  campaign_id: number
  amount: number
  status: string
  code?: string
  payment_url: string
}

export interface ITransaction {
  id: number
  order_no: string
  campaign_id: number
  amount: number
  status: string
  code?: string
  payment_url: string
  campaign: ICampaignTransaction
  donor: string
}

export interface ICampaignTransaction {
  name: string
  campaign_image: string
}
