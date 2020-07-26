import { hash } from 'bcryptjs'
import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/models/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const isAlreadyRegistered = await this.usersRepository.findByEmail(email)
    if (isAlreadyRegistered) throw new AppError('Email address already used.')

    const hashedPass = await hash(password, 0)
    const data = { name, email, password: hashedPass }
    const user = await this.usersRepository.create(data)

    return user
  }
}

export default CreateUserService
