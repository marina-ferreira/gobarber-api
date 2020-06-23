import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
  return response.json({ message: 'Hello there!' })
})

app.post('/users', (request, response) => {
  const { name, email } = request.body
  const user = { name, email }

  return response.json({ user })
})

app.listen(4000, () => console.log('🍀Server started on port 4000'))
