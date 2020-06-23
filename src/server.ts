import express from 'express'

const app = express()

app.get('/', (request, response) => {
  return response.json({ message: 'Hello there!' })
})

app.listen(4000, () => console.log('🍀Server started on port 4000'))
