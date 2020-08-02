import { uuid } from 'uuidv4'
import { isEqual, getMonth, getYear } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import Appointment from '@modules/appointments/infra/typeorm//models/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthDTO from '@modules/appointments/dtos/IFindAllInMonthDTO'

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.appointments.find(appointment =>
      isEqual(appointment.date, date)
    )
  }

  public async findAllInMonth({
    provider_id,
    month,
    year
  }: IFindAllInMonthDTO): Promise<Appointment[]> {
    return this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) + 1 === year
    )
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
