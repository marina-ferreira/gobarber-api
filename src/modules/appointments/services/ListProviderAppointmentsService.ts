import { injectable, inject } from 'tsyringe'

import Appointment from '@modules/appointments/infra/typeorm/models/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequest {
  provider_id: string
  month: number
  year: number
  day: number
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day
  }: IRequest): Promise<Appointment[]> {
    const cachedData = await this.cacheProvider.recover('key')
    console.log(cachedData)
    // await this.cacheProvider.save('key', 'value')
    return this.appointmentsRepository.findAllInDay({
      provider_id,
      month,
      year,
      day
    })
  }
}

export default ListProviderAppointmentsService
