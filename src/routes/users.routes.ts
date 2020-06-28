import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateUserService from '../services/CreateUserService'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body
    const createUserService = new CreateUserService()
    const user = await createUserService.execute({ name, email, password })

    delete user.password

    response.json(user)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    return response.json({ ok: true })
  }
)

export default usersRouter
