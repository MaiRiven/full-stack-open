import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const updatePerson = (id, newObject) => {
    const reqest = axios.put(`{baseUrl}/${id}`, newObject)
    return reqest.then(response => response.data)
}

const getDeletedPerson = (id) => {
    const request = axios.delete(`{baseUrl}/${id}`)
    return request.then(response => response.data)
}

const personServices = { getAll, create, updatePerson, getDeletedPerson }

export default personServices