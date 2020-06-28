import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User,
  token: string
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User)
    const user = await usersRepository.findOne({
      where: { email }
    })

    if (!user) throw new Error('Incorrect email or password combination')

    const isPasswordMatch = await compare(password, user.password)

    const token = sign({}, 'e959ace279e564bf838de1913cd1de69', {
      subject: user.id,
      expiresIn: '1d'
    })

    if (!isPasswordMatch) throw new Error('Incorrect email or password combination')

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserService
