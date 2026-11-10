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

app.get("/" , (request, response) => {
  response.send('<h1>Hello World </h1>')
})
 /*Not working yet
app.get("/info", (request, response) => {
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
    `)
})
*/

app.get("/api/persons", (request, response) => {
  Person.find({})
    .then(person => {
      response.json(person)
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


app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  const index = persons.findIndex(person => person.id === id)
  
  if(index === -1) {
    return response.status(404).json({error: "person not found"})
  }

  persons.splice(index,1)
  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({error: "name or number is missing"})
  }

  if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({error: "name must be unique"})
  }

  const person = {
    name: body.name,
    number: body.number,
    id: crypto.randomUUID()
  }

  persons.push(person)
  response.json(person)
})
*/

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})