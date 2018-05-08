import firebase from 'firebase'
require('firebase/database')	
// import config from './../config'


// var firebaseConfig = {
// 	apiKey: config.FIREBASE_API_KEY,
// 	authDomain: config.FIREBASE_AUTH_DOMAIN,
// 	databaseURL: config.FIREBASE_DATABASE_URL,
// 	projectId: config.FIREBASE_PROJECT_ID,
// 	storageBucket: config.FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID
// }

// firebase.initializeApp(firebaseConfig)


export default {
	getLiveTransaction: (id) => {
		return new Promise((resolve, reject) => {
			firebase
				.auth()
				.signInWithCustomToken(localStorage.getItem('firebaseToken'))
				.then(() => {
					const resp = firebase.database().ref(`transaction/${ id }`)
					resp.on('value', (val) => {
						console.log(val.val())
						resolve(val.val())
					})
				})
				.catch(function(error) {
					// Handle Errors here.
					var errorCode = error.code
					var errorMessage = error.message
					console.log('err', errorCode, errorMessage)
					reject(error)
				})
		})
	}
}