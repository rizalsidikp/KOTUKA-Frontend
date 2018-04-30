import api from './api'
import config from '../config'

export default {
  login: (email, password, scope) =>
    api.post('/oauth/token', {
      username: email,
      password,
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      grant_type: config.GRANT_TYPE,
      scope,
  }),
  register: (first_name, last_name,email, password, phone_number) =>
    api.post('/register', {
      email, password, first_name, last_name, phone_number,
    }),
  getUser: () => api.get('/user'),
  updateProfile: profileData => api.post('/update_profile', { ...profileData }),
  refreshToken: () => api.get('/refresh-token'),
  oauthFacebook: (token,) => api.post('/sso/facebook', { token, provider: 'facebook' }),
  oauthGoogle: token => api.post('/sso/google', { token, provider: 'google' }),
  forgotPass: email => api.post('/password/forgot', { email }),
  verificationCode: (email, token) => api.post('/password/verify_code', { email, token }),
  resetPass: (email, new_password) => api.post('/password/reset', { email, new_password }),
  myBalance:() => api.get('/fee/mybalance'),
  updateProfilePicture: (image) => api.postData('/photo_profile', { image }),
  uploadIdCard: (image) => api.postData('/user/idcard', { image }),
  getIdCard: () => api.get('/user/idcard'),
  getAddress: () => api.get('/address'),
  postAddress: data => api.post('/address', data),
  myAccount: () => api.get('/accounts'),
  deleteAccount: id => api.delete(`/accounts/${id}`),
  updateAccount: (data) => api.post('/accounts/update', { ...data }),
  addAccount: (data) => api.post('/accounts', { ...data }),
  logout: () => api.get('/logout'),
  feederRegister: (data) => api.postData('/feeder', data)
}
