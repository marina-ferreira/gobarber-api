import { uuid } from 'uuidv4'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import Appointment from '@modules/appointments/infra/typeorm//models/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.appointments.find(appointment => appointment.date === date)
  }

  public async create({
    provider_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { id: uuid(), date, provider_id })

    this.appointments.push(appointment)
    return appointment
  }
}

export default FakeAppointmentsRepository
