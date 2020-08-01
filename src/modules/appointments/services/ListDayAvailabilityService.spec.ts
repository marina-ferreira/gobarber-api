import FakeAppointmentsRepository from '@modules/appointments/repositories/fake/FakeAppointmentsRepository'
import ListDayAvailabilityService from './ListDayAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listDayAvailabilityService: ListDayAvailabilityService

describe('ListDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listDayAvailabilityService = new ListDayAvailabilityService(
      fakeAppointmentsRepository
    )
  })

  it('lists month availability', async () => {
    const appointmentsParams = [
      {
        provider_id: '1',
        date: new Date(2020, 4, 20, 8, 0, 0)
      },
      {
        provider_id: '1',
        date: new Date(2020, 4, 20, 10, 0, 0)
      }
    ]

    const dayAppointments = appointmentsParams.map(params => {
      return Promise.resolve(fakeAppointmentsRepository.create(params))
    })

    await Promise.all(dayAppointments)

    const availability = await listDayAvailabilityService.execute({
      provider_id: '1',
      month: 5,
      year: 2020,
      day: 20
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true }
      ])
    )
  })
})
