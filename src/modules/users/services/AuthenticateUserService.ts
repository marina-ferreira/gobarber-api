import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/models/User'
import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    const errorMesaage = 'Incorrect email or password combination'

    if (!user) throw new AppError(errorMesaage, 401)

    const isPasswordMatch = await compare(password, user.password)

    if (!isPasswordMatch) throw new AppError(errorMesaage, 401)

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, { subject: user.id, expiresIn })

    return { user, token }
  }
}

export default AuthenticateUserService
