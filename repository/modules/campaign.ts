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

  async get(id: string): Promise<ICampaignDetail> {
    return await this.call<ICampaignDetail>(
      'GET',
      `${this.RESOURCE}/campaigns/${id}`
    )
  }
}

export default CampaignModule
