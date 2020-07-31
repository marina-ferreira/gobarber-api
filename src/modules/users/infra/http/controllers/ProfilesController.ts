import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateProfileService from '@modules/users/services/UpdateProfileService'

class ProfilesController {
  public async show(request: Request, response: Response): Promise<Response> {
    // const { user_id } = request.user.id
    // const { name, email, password, old_password } = request.body
    // const updateProfileService = container.resolve(UpdateProfileService)
    // const user = await updateProfileService.execute({
    //   user_id,
    //   name,
    //   email,
    //   password,
    //   old_password
    // })
    // delete user.password
    // return response.json(user)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user.id
    const { name, email, password, old_password } = request.body
    const updateProfileService = container.resolve(UpdateProfileService)
    const user = await updateProfileService.execute({
      user_id,
      name,
      email,
      password,
      old_password
    })

    delete user.password

    return response.json(user)
  }
}

export default ProfilesController
