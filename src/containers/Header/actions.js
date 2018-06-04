import * as constants from './constants'
import auth from './../../services/auth'
import { setHtmlStorage } from './../../services/helper'
import history from './../../history'
import moment from 'moment'
import { setAlertStatus } from '../Alert/actions'
import strings from '../../localizations'

export function setLoading(loading) {
	return { type: constants.SET_LOADING, payload: { loading } }
}

export function setInitialState() {
	return { type: constants.SET_INITIAL_STATE }
}

export function setUser(user) {
	user.address = JSON.parse(user.address)
	return { type: constants.SET_USER, payload: { user } }
}


export function setIdCard(identification_photo) {
	return { type: constants.SET_ID_CARD, payload: { identification_photo } }
}

export function setInvalid(invalid, invalidMessage) {
	return { type: constants.SET_INVALID, payload: { invalid, invalidMessage } }
}


export function loginWithGoogle() {
	return async(dispatch) => {
		dispatch(setLoading(true))
		try {
			const response = await auth.googleLogin()
			const user = response.additionalUserInfo.profile
			const name = userSplitName(user.name)
			const payload = {
				...name,
				avatar: user.picture,
				email: user.email
			}
			const userResponse = await auth.exLogin(payload)
			dispatch(setUser(userResponse.data_user))
			setHtmlStorage('accessToken', userResponse.token, 1500)
			setHtmlStorage('firebaseToken', userResponse.rtDB, 1500)
			if(userResponse.data_user.address === null || userResponse.data_user.phone === null){
				localStorage.setItem('secondRegistration', 'true')
			}else{
				localStorage.removeItem('secondRegistration')
			}
			console.log(userResponse.data_user)
			history.push('/dashboard/post')
		} catch (error) {
			console.log(error)
		}
		dispatch(setLoading(false))
	}
}

export function loginWithFacebook() {
	return async(dispatch) => {
		dispatch(setLoading(true))		
		try {
			const response = await auth.facebookLogin()
			const user = response.additionalUserInfo.profile
			const name = userSplitName(user.name)
			const payload = {
				...name,
				birthday: moment(user.birthday, 'MM/DD/YYYY').format('YYYY-MM-DD'),
				avatar: user.picture.data.url,
				email: user.email
			}
			const userResponse = await auth.exLogin(payload)
			dispatch(setUser(userResponse.data_user))			
			setHtmlStorage('accessToken', userResponse.token, 1500)
			setHtmlStorage('firebaseToken', userResponse.rtDB, 1500)
			history.push('/dashboard/post')
		} catch (error) {
			console.log(error)
		}
		dispatch(setLoading(false))		
	}
}

export function login(username, password) {
	return async(dispatch) => {
		dispatch(setLoading(true))
		try {
			const response = await auth.login(username, password)
			if(response.result && response.result.verified !== 'verified'){
				return history.push({
					pathname: '/confirmation',
					state: { email: response.result.email }
				})
			}
			console.log(response)
			if(response.data_user){
				dispatch(setUser(response.data_user))
				setHtmlStorage('accessToken', response.token, 1500)
				setHtmlStorage('firebaseToken', response.rtDB, 1500)
				return history.push('/dashboard/post')			
			}else{
				dispatch(setLoading(false))		
				return dispatch(setInvalid(true, strings.login_invalid))
			}
		} catch (error) {
			console.log(error)
			dispatch(setLoading(false))		
			return dispatch(setInvalid(true, strings.wrong))
		}
	}
}

export function logout() {
	return async() => {
		await localStorage.clear()
		location.reload()
		// removeHtmlStorage('accessToken')
		// removeHtmlStorage('firebaseToken')
		// await dispatch(setInitialState())
		// history.push('/')
	}
}

export function register(email, password) {
	return async(dispatch) => {
		dispatch(setLoading(true))
		try {
			const response = await auth.register({email, password})
			return history.push({
				pathname: '/confirmation',
				state: {
					email: response.result.email
				}
			})			
		} catch (error) {
			console.log(error)
		}
		dispatch(setLoading(false))		
	}
}

function userSplitName(name) {
	let nameArray = name.split(' ')
	const nameLength = nameArray.length
	let resultName = {
		first_and_middle_name: '',
		last_name: ''
	}
	if(nameLength > 1){
		resultName.last_name = nameArray[nameLength - 1]
		nameArray.pop()
		resultName.first_and_middle_name = nameArray.join(' ')
	}else{
		resultName.first_and_middle_name = name
	}
	return resultName
}

export function sendEmail(payload) {
	return async(dispatch) => {
		dispatch(setLoading(true))
		try {
			const response = await auth.sendEmail(payload)
			console.log(response)
			dispatch(setAlertStatus(true, 'success', strings.success_send_email))
		} catch (error) {
			console.log(error)
			dispatch(setAlertStatus(true, 'danger', strings.fail_send_email))			
		}
		dispatch(setLoading(false))		
	}
}