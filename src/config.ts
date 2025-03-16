import { z } from 'zod'


export const config = {
  app: loadAppEnvs(),
}

function loadAppEnvs() {
  const envSchema = z.object({
    API_URL: z.string().url(),
    APP_ENV: z.enum(['dev', 'prod']),
  })

  return envSchema.parse(process.env)
}
