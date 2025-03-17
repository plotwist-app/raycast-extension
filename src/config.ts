import { z } from 'zod'
import { apiUrl, tmdbAccessToken } from '../ignore-envs'


export const config = {
  apiUrl: apiUrl,
  tmdbAccessToken: tmdbAccessToken,
}
