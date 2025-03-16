import { z } from 'zod'


export const config = {
  app: loadAppEnvs(),
  tmdb: loadTMDBEnvs(),
}

function loadAppEnvs() {
  const envSchema = z.object({
    API_URL: z.string().url(),
    APP_ENV: z.enum(['dev', 'prod']),
  })

  return envSchema.parse(process.env)
}

function loadTMDBEnvs() {
  const envSchema = z.object({
    TMDB_ACCESS_TOKEN: z.string(),  
  })

  return envSchema.parse(process.env)
}
