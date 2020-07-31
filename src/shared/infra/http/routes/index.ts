import { Router } from 'express'

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes'
import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import passwordsRouter from '@modules/users/infra/http/routes/passwords.routes'
import profileRouter from '@modules/users/infra/http/routes/profiles.routes'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/passwords', passwordsRouter)
routes.use('/profiles', profileRouter)

export default routes
