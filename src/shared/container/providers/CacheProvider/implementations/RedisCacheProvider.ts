import Redis, { Redis as RedisClient } from 'ioredis'

import cacheConfig from '@config/cache'

import ICacheProvider from '../models/ICacheProvider'
// import ISendMailDTO from '../dtos/ISendMailDTO'

class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient

  constructor() {
    this.client = new Redis(cacheConfig.config.redis)
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, JSON.stringify(value))
  }

  public async recover(key: string): Promise<string | null> {
    return this.client.get(key)
  }

  public async invalidate(key: string): Promise<void> {}
}

export default RedisCacheProvider
