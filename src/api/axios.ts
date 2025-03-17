import Axios, { type AxiosRequestConfig } from 'axios'
import { QueryClient } from '@tanstack/react-query'
import { config } from '../config'

const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwZDI2Y2JlLWRmYWEtNGJlZC1hMDRmLWM1ZjUzYjg1M2UwMiIsImlhdCI6MTc0MjE2MjIxNn0.OFzmdsBGoTgMZCP2lKWmLVXyi2VY58OdX464kG5ZVFI'

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
