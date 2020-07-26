import { startOfHour } from 'date-fns'

import Appointment from '@modules/appointments/infra/typeorm//models/Appointment'
import AppError from '@shared/errors/AppError'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

interface IRequest {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  constructor(private appointmentRepository: ICreateAppointmentDTO) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)
    const findAppointment = await this.appointmentRepository.findByDate(
      appointmentDate
    )

    if (findAppointment) {
      throw new AppError('This appointment is already booked.')
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
