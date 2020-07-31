import { getRepository, Repository, Raw } from 'typeorm'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import Appointment from '@modules/appointments/infra/typeorm//models/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthDTO from '@modules/appointments/dtos/IFindAllInMonthDTO'

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.ormRepository.findOne({ where: { date } })
  }

  public async findAllInMonth({
    provider_id,
    month,
    year
  }: IFindAllInMonthDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0')

    return this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
        )
      }
    })
  }

  public async create({
    provider_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date })
    await this.ormRepository.save(appointment)

    return appointment
  }
}

export default AppointmentsRepository
