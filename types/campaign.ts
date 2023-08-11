export interface ICreateCampaignInput {
  id?: string
}

export interface ICreateCampaignResponse {
  id?: string
}

export interface ICampaign {
  id: number
  name: string
  short_description: string
  image_url: string
  goal_amount: number
  current_amount: number
  slug: string
}

export interface ICampaignImage {
  image_url: string
  is_primary: boolean
}

export interface ICampaignDetail extends ICampaign {
  description: string
  user_id: number
  perks: string[]
  backer_count: number
  images: ICampaignImage[]
}
