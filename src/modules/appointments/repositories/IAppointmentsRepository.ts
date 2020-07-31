import Appointment from '@modules/appointments/infra/typeorm/models/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthDTO from '@modules/appointments/dtos/IFindAllInMonthDTO'

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
  findAllInMonth(data: IFindAllInMonthDTO): Promise<Appointment[]>
}

export default IAppointmentsRepository
