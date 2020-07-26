import { getRepository, Repository } from 'typeorm'

import IAppointmentsRepositories from '@modules/appointments/repositories/IAppointmentsRepositories'
import Appointment from '@modules/appointments/infra/typeorm//models/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

class AppointmentsRepository implements IAppointmentsRepositories {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.ormRepository.findOne({ where: { date } })
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