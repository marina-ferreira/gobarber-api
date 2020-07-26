import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '@modules/appointments/infra/typeorm//models/Appointment'
import AppError from '@shared/errors/AppError'
import AppointmentRepository from '../infra/typeorm/repositories/AppointmentRepository'

interface Request {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository)
    const appointmentDate = startOfHour(date)
    const findAppointment = await appointmentRepository.findByDate(
      appointmentDate
    )

    if (findAppointment) {
      throw new AppError('This appointment is already booked.')
    }

    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate
    })

    await appointmentRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
