import 'dotenv/config'
import express, { request, response } from "express"
import morgan from "morgan"
import cors from "cors"
import Person from './models/person.js'


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (request, response) => {
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get("/info", (request, response) => {
  Person.countDocuments({})
    .then(count => {
        const date = new Date()
        response.send(`
          <p>Phonebook has info for ${count} people</p>
          <p>${date}</p>
        `)
    })
    .catch(error => {
      console.error('Error conecting to database', error.message)
      response.status(500).json({ error : 'Error conecting to database'})
    })
})

app.get("/api/persons", (request, response) => {
  Person.find({})
    .then(person => {
      response.json(person)
    })
    .catch(error => {
      console.error('Error conecting to database', error.message)
      response.status(500).json({ error : 'Error conecting to database'})
    })
})

 /*Not working yet
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
*/

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      console.error('Error conecting to database', error.message)
      response.status(500).json({ error : 'Error conecting to database'})
    })
})


app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({error: "name or number is missing"})
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(personSaved => {
      response.json(personSaved)
    })
    .catch(error => {
      console.error('Error saving to DB', error.message)
      response.status(500).json({ error : "Error saving to DB"})
    })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})