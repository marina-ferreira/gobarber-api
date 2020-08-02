import { injectable, inject } from 'tsyringe'
import {} from 'date-fns'
import User from '@modules/users/infra/typeorm/models/User'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

interface IRequest {
  provider_id: string
  month: number
  year: number
}

type IResponse = Array<{
  day: number
  available: boolean
}>

@injectable()
class ListMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    month,
    year
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonth({
      provider_id,
      month,
      year
    })
    return [{ day: 1, available: false }]
  }
}

export default ListMonthAvailabilityService
