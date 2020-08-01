import { injectable, inject } from 'tsyringe'
import { getHours } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

interface IRequest {
  provider_id: string
  month: number
  year: number
  day: number
}

type IResponse = Array<{
  hour: number
  available: boolean
}>

@injectable()
class ListDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDay({
      provider_id,
      month,
      year,
      day
    })

    const hoursStart = 8
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hoursStart
    )
    const availability = eachHourArray.map(hour => {
      const appointmentsInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      )

      return { hour, available: !appointmentsInHour }
    })

    return availability
  }
}

export default ListDayAvailabilityService
