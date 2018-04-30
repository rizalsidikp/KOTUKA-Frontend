import api from './api'

export default {
  postEmail: email => api.post('/password/forgot', email),
  postCode: code => api.post('/password/verify_code', code),
  postNewPassword: newPassword => api.post('/password/reset', newPassword)
}