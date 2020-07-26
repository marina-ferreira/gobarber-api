import path from 'path'
import fs from 'fs'
import { injectable, inject } from 'tsyringe'

import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import User from '@modules/users/infra/typeorm/models/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface IRequest {
  user_id: string
  avatarFileName: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)
    const errorMessage = 'Only authenticated users can change avatar'
    if (!user) throw new AppError(errorMessage, 401)

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const doesFileExist = await fs.promises.stat(userAvatarFilePath)

      if (doesFileExist) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFileName
    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
