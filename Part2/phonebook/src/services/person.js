import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const persons = axios.get(baseUrl)
    return persons.then( response => response.data)
}

export default {
    getAll
}