import { $Fetch, FetchError } from 'ohmyfetch'

class HttpFactory {
  private $fetch: $Fetch

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher
  }

  async call<T>(
    method: string,
    url: string,
    payload?: object,
    extras = {}
  ): Promise<T> {
    return await this.$fetch(url, {
      method,
      body: payload,
      ...extras,
    })
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        if (error instanceof FetchError) {
          if (error.data?.meta.code === 404) {
            showError({
              statusCode: 404,
              message: error.data?.meta.message,
              fatal: true,
            })
          }

          if (error.data?.meta.code === 403) {
            showError({
              statusCode: 403,
              statusMessage: error.data?.meta.message,
            })
          }

          return error.data?.data
        }
        showError({
          statusCode: 500,
          statusMessage: 'Terjadi kesalahan !',
        })
      })
  }
}

export default HttpFactory
