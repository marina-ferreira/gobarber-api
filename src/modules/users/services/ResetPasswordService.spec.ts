import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository'
import FakeUserTokensRepository from '@modules/users/repositories/fake/FakeUserTokensRepository'

import AppError from '@shared/errors/AppError'
import ResetPasswordService from './ResetPasswordService'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let resetPasswordService: ResetPasswordService

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository
    )
  })

  it('resets password', async () => {
    const email = 'user@email.com'
    const newPassword = 'new pass'
    const user = await fakeUsersRepository.create({
      email,
      name: 'Test User',
      password: '123456'
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)
    await resetPasswordService.execute({ token, password: newPassword })

    const updatedUser = await fakeUsersRepository.findById(user.id)

    expect(updatedUser?.password).toEqual(newPassword)
  })
})
