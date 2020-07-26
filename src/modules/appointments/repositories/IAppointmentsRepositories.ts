import Appointment from '@modules/appointments/infra/typeorm/models/Appointment'

interface IAppointmentsRepositories {
  create(): Appointment
  findByDate(date: Date): Promise<Appointment | undefined>
}

export default IAppointmentsRepositories
