import http from './http'

const URL = `api/employee`

export function getEmployees() {
  return http.get(`${URL}/all`)
}

export function getEmployeeById({ id }) {
  return http.get(`${URL}/${id}`)
}

export function postEmployee({ employee }) {
  const payload = JSON.parse(JSON.stringify(employee))
  return http.post(`${URL}`, payload)
}

export function putEmployee({ employee, id }) {
  const payload = JSON.parse(JSON.stringify(employee))
  return http.put(`${URL}/${id}`, payload)
}

export function deleteEmployee({ id }) {
  return http.delete(`${URL}/${id}`)
}
