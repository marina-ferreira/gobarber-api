import Appointment from '@modules/appointments/infra/typeorm/models/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

interface IAppointmentsRepositories {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
}

export default IAppointmentsRepositories
