import { injectable, inject } from 'tsyringe'
import { classToClass } from 'class-transformer'

import User from '@modules/users/infra/typeorm/models/User'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface IRequest {
  user_id: string
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const cacheKey = `providers-list:${user_id}`
    let providers = await this.cacheProvider.recover<User[]>(cacheKey)

    if (!providers) {
      providers = await this.usersRepository.findAllProviders(user_id)
      await this.cacheProvider.save(cacheKey, classToClass(providers))
    }

    return providers
  }
}

export default ListProvidersService
