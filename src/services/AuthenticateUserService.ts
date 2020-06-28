import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'

import User from '../models/User'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User)
    const user = await usersRepository.findOne({
      where: { email }
    })

    if (!user) throw new Error('Incorrect email or password combination')

    const isPasswordMatch = await compare(password, user.password)

    if (!isPasswordMatch) throw new Error('Incorrect email or password combination')

    return { user }
  }
}

export default AuthenticateUserService
