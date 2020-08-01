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
      host: 'localhost',
      port: 6379,
      pasword: undefined
    }
  }
} as IRedisConfig
