import axios from "axios"
const baseUrl = 'https://phonebook-backend-xr2d.onrender.com/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then( response => response.data)
}

const postPerson = personObject => {
    const request = axios.post(baseUrl , personObject)
    return request.then( response => response.data)
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then( response => response)
}

const updatePerson = personObject => {
    const request = axios.put(`${baseUrl}/${personObject.id}`, personObject)
    return request.then(response => response.data)
}

export default {
    getAll,
    deletePerson,
    postPerson,
    updatePerson
}