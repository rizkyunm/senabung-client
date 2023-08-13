import HttpFactory from '../factory'
import {
  ICreateCampaignInput,
  ICreateCampaignResponse,
  ICampaign,
  ICampaignDetail,
} from 'types/campaign'

class CampaignModule extends HttpFactory {
  private RESOURCE = '/api/v1'

  async create(
    campaign: ICreateCampaignInput
  ): Promise<ICreateCampaignResponse> {
    return await this.call<ICreateCampaignResponse>(
      'POST',
      `${this.RESOURCE}/campaigns`,
      campaign
    )
  }

  async list(): Promise<ICampaign[]> {
    return await this.call<ICampaign[]>('GET', `${this.RESOURCE}/campaigns`)
  }

  async highlight(): Promise<ICampaign> {
    return await this.call<ICampaign>(
      'GET',
      `${this.RESOURCE}/campaigns/highlight`
    )
  }

  async get(id: string): Promise<ICampaignDetail> {
    return await this.call<ICampaignDetail>(
      'GET',
      `${this.RESOURCE}/campaigns/${id}`
    )
  }

  async getBySlug(slug: string): Promise<ICampaignDetail> {
    return await this.call<ICampaignDetail>(
      'GET',
      `${this.RESOURCE}/campaigns/slug/${slug}`
    )
  }
}

export default CampaignModule
