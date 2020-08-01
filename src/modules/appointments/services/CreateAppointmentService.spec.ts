import FakeAppointmentsRepository from '@modules/appointments/repositories/fake/FakeAppointmentsRepository'
import AppError from '@shared/errors/AppError'
import CreateAppointmentService from './CreateAppointmentService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointmentService: CreateAppointmentService

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    )
  })

  it('creates a new appointment', async () => {
    const userId = '7654321'
    const providerId = '1234567'
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      user_id: userId,
      provider_id: providerId
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe(providerId)
  })

  it('creates does not create two appointments on the same time', async () => {
    const appointmentDate = new Date()
    const appointmentParams = {
      date: appointmentDate,
      provider_id: '1234567',
      user_id: '7654321'
    }
    await createAppointmentService.execute(appointmentParams)

    await expect(
      createAppointmentService.execute(appointmentParams)
    ).rejects.toBeInstanceOf(AppError)
  })
})
