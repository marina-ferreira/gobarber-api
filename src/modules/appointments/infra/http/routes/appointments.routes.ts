import { Router } from 'express'
import { parseISO } from 'date-fns'

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()
appointmentsRouter.use(ensureAuthenticated)

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentRepository.find()

//   return response.json(appointments)
// })

appointmentsRouter.post('/', async (request, response) => {
  const appointmentRepository = new AppointmentRepository()
  const createAppointmentService = new CreateAppointmentService(
    appointmentRepository
  )
  const { provider_id, date } = request.body
  const parsedDate = parseISO(date)

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parsedDate
  })

  return response.json(appointment)
})

export default appointmentsRouter
