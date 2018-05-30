import firebase from 'firebase'
import config from './../config'
import api from './api'

var firebaseConfig = {
	apiKey: config.FIREBASE_API_KEY,
	authDomain: config.FIREBASE_AUTH_DOMAIN,
	databaseURL: config.FIREBASE_DATABASE_URL,
	projectId: config.FIREBASE_PROJECT_ID,
	storageBucket: config.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID
}
firebase.initializeApp(firebaseConfig)

const google = new firebase.auth.GoogleAuthProvider()
const facebook = new firebase.auth.FacebookAuthProvider()


google.addScope('email').addScope('profile')
facebook.addScope('email').addScope('public_profile').addScope('user_birthday')


export default {
	googleLogin: () => {
		return new Promise((resolve, reject) => {
			firebase.auth().signInWithPopup(google)
				.then((user) => {
				// const apiResponse = await auth.oauthGoogle(result.credential.accessToken)
					resolve(user)
				}).catch((error) => {
					reject(error)
				})
		})
	},
	
	facebookLogin : () => {
		return new Promise((resolve, reject) => {
			firebase.auth().signInWithPopup(facebook)
				.then((user) => {
				// const apiResponse = await auth.oauthGoogle(result.credential.accessToken)
					resolve(user)
				}).catch((error) => {
					reject(error)
				})
		})
	},
	
	login: (username, password) => api.post('users/signin', { username, password }),
	exLogin: (payload) => api.post('users/exaccount', { ...payload }),
	register: (payload) => api.post('users/signup', { ...payload }),
	sendEmail: (payload) => api.post('users/helprequest', { ...payload }),
}