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

app.get("/info", (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
        const date = new Date()
        response.send(`
          <p>Phonebook has info for ${count} people</p>
          <p>${date}</p>
        `)
    })
    .catch(error => next(error))
})

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
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

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post("/api/persons", (request, response, next) => {
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
    .catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const person = {
    name : body.name,
    number : body.number
  }

  Person.findByIdAndUpdate(id, person, {new: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))

})

const errorHandler = (error, request, response, next) => {
  console.error(error.name)

  if (error.name === "CastError") {
    console.error("malformatted id")
    return response.status(400).json({error : "malformatted id"})
  }

  if (error.name=== "ValidationError") {
    return response.status(400).json({error : error.message})
  }

  if (err.name === 'SyntaxError' && err.status === 400) {
    return response.status(400).json({error : error.message})
  }

  console.error(error.message)
  return response.status(500).json({error : "error not configured"})
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})