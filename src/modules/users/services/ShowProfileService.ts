import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import User from '@modules/users/infra/typeorm/models/User'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface IRequest {
  user_id: string
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)
    if (!user) throw new AppError('User not found')

    return user
  }
}

export default ShowProfileService