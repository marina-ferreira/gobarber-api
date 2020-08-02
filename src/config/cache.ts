import { RedisOptions } from 'ioredis'

interface IRedisConfig {
  driver: string
  config: {
    redis: RedisOptions
  }
}

export default {
  driver: 'redis',
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      pasword: process.env.REDIS_PASS || undefined
    }
  }
} as IRedisConfig
