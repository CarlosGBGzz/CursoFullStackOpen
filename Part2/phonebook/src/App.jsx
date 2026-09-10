import { useState } from 'react'

const Numbers = ({numbers}) => (
  <>
    {numbers.map(number => 
      <p key={number.id}>{number.name}: {number.number}</p>
    )}
  </>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some( person => person.name.toLowerCase() === newName.toLocaleLowerCase())) {
      alert(`${newName} is already added to phonebook`)
    } else {
      let personObject = {
        name : newName,
        number : newNumber,
        id: crypto.randomUUID()}
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <p>name: <input value={newName} onChange={handleNameChange}/></p>
          <p>number: <input value={newNumber} onChange={handleNumberChange}/></p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers numbers={persons} />
    </div>
  )
}

export default App