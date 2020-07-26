import FakeAppointmentsRepository from '@modules/appointments/repositories/fake/FakeAppointmentsRepository'
import AppError from '@shared/errors/AppError'
import CreateAppointmentService from './CreateAppointmentService'

describe('CreateAppointmentService', () => {
  it('creates a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository()
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    )

    const providerId = '1234567'
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: providerId
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe(providerId)
  })

  it('creates does not create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository()
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    )

    const appointmentDate = new Date()

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '1234567'
    })

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '7654321'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
