import Axios, { type AxiosRequestConfig } from 'axios'
import { QueryClient } from '@tanstack/react-query'
import { config } from '../config'
import { API_TOKEN } from '../../ignore-envs'

export const queryClient = new QueryClient()

export const AXIOS_INSTANCE = Axios.create({
  baseURL: config.apiUrl,
})

AXIOS_INSTANCE.interceptors.request.use(
  (config) => {

    config.headers.Authorization = `Bearer ${API_TOKEN}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

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
