import Axios, { type AxiosRequestConfig } from 'axios'
import { config } from '../config'

export const AXIOS_INSTANCE = Axios.create({
  baseURL: config.app.API_URL,
})

export const axiosInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({
    ...config,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}
