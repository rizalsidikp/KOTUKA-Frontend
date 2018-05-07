import * as constants from './constants'
import auth from './../../services/auth'
import { setHtmlStorage, removeHtmlStorage } from './../../services/helper'
import history from './../../history'
import moment from 'moment'

export function setLoading(loading) {
	return { type: constants.SET_LOADING, payload: { loading } }
}

export function setInitialState() {
	return { type: constants.SET_INITIAL_STATE }
}

export function setUser(user) {
	return { type: constants.SET_USER, payload: { user } }
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
			setHtmlStorage('accessToken', userResponse.token, 24*3600)
			setHtmlStorage('firebaseToken', userResponse.rtDB, 24*3600)
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
			setHtmlStorage('accessToken', userResponse.token, 24*3600)
			setHtmlStorage('firebaseToken', userResponse.rtDB, 24*3600)
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
			dispatch(setUser(response.result))			
			setHtmlStorage('accessToken', response.token, 24*3600)
			setHtmlStorage('firebaseToken', response.rtDB, 24*3600)
			return history.push('/dashboard/post')			
		} catch (error) {
			console.log(error)
		}
		dispatch(setLoading(false))		
	}
}

export function logout() {
	return async(dispatch) => {
		removeHtmlStorage('accessToken')
		removeHtmlStorage('firebaseToken')
		await dispatch(setInitialState())
		history.push('/')
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