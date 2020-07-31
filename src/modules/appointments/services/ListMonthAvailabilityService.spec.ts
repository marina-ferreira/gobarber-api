import FakeAppointmentsRepository from '@modules/appointments/repositories/fake/FakeAppointmentsRepository'
import ListMonthAvailabilityService from './ListMonthAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listMonthAvailabilityService: ListMonthAvailabilityService

describe('ListMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listMonthAvailabilityService = new ListMonthAvailabilityService(
      fakeAppointmentsRepository
    )
  })

  it('lists month availability', async () => {
    const appointmentParams = {
      provider_id: '1',
      date: new Date(2020, 4, 20, 8, 0, 0)
    }
    const otherAppointmentParams = {
      provider_id: '1',
      date: new Date(2020, 4, 20, 10, 0, 0)
    }
    const anotherAppointmentParams = {
      provider_id: '1',
      date: new Date(2020, 4, 20, 10, 0, 0)
    }

    await fakeAppointmentsRepository.create(appointmentParams)
    await fakeAppointmentsRepository.create(otherAppointmentParams)
    await fakeAppointmentsRepository.create(anotherAppointmentParams)
    const availability = await listMonthAvailabilityService.execute({
      provider_id: '9',
      month: 5,
      year: 2020
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true }
      ])
    )
  })
})
