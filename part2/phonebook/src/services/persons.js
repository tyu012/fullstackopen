import axios from 'axios'

const baseURL = '/api/persons'

const getAll = () => {
	const request = axios.get(baseURL)
	return request.then(response => response.data)
}

const create = newObject => {
	const request = axios.post(baseURL, newObject)
	return request.then(response => response.data)
}

// Not required to be completed at this point
const update = (id, newObject) => {
	const request = axios.put(`${baseURL}/${id}`, newObject)
	return request.then(response => response.data)
}

const deleteUsingID = id => {
	const request = axios.delete(`${baseURL}/${id}`)
	return request.then(response => response.data)
}

const deleteUsingObject = object => {
	return deleteUsingID(object.id)
}

const exports =  {
	getAll,
	create,
	update,
	deleteUsingID,
	deleteUsingObject,
}

export default exports