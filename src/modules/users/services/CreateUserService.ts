import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import User from '../models/User'
import AppError from '../../../errors/AppError'

interface Request {
  name: string
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const isAlreadyRegistered = await usersRepository.findOne({
      where: { email }
    })

    if (isAlreadyRegistered) throw new AppError('Email address already used.')

    const hashedPass = await hash(password, 0)

    const user = usersRepository.create({
      name,
      email,
      password: hashedPass
    })

    await usersRepository.save(user)

    return user
  }
}

export default CreateUserService
