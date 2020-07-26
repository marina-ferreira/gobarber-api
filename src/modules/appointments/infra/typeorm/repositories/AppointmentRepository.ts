import { EntityRepository, Repository } from 'typeorm'

import IAppointmentsRepositories from '@modules/appointments/repositories/IAppointmentsRepositories'
import Appointment from '@modules/appointments/infra/typeorm//models/Appointment'

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
  implements IAppointmentsRepositories {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.findOne({ where: { date } })
  }
}

export default AppointmentsRepository
