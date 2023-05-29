import axios from "axios";

const baseUrl = 'http://localhost:3001/initialTasks'

const getAll = () => {
    return axios.get(baseUrl).then((response) => response.data)
}

const create = (newTask) => {
    return axios.post(`${baseUrl}`, newTask).then((response) => response.data)
}

const update = (id, updatedTask) => {
    return axios.put(`${baseUrl}/${id}`, updatedTask).then((response) => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {getAll, create, update, remove}