import { $fetch, FetchOptions } from 'ohmyfetch'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import AuthModule from '~/repository/modules/auth'
import CampaignModule from '~/repository/modules/campaign'
import TransactionModule from '~/repository/modules/transaction'

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
  auth: AuthModule
  campaign: CampaignModule
  transaction: TransactionModule
}

export default defineNuxtPlugin(() => {
  const fetchOptions: FetchOptions = {
    baseURL: useRuntimeConfig().public.apiBase,
  }

  /** create a new instance of $fetcher with custom option */
  const apiFetcher = $fetch.create(fetchOptions)

  /** an object containing all repositories we need to expose */
  const modules: IApiInstance = {
    auth: new AuthModule(apiFetcher),
    campaign: new CampaignModule(apiFetcher),
    transaction: new TransactionModule(apiFetcher),
  }

  return {
    provide: {
      api: modules,
    },
  }
})
