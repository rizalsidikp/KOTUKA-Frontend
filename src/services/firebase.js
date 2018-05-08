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
	getLiveTransaction: () => {
		firebase
			.auth()
			.signInWithCustomToken(localStorage.getItem('firebaseToken'))
			.then(() => {
				const resp = firebase.database().ref('transaction/1')
				resp.on('value', (val) => {
					console.log(val.val())
				})
				
			})
			.catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code
				var errorMessage = error.message
				console.log('err', errorCode, errorMessage)
				// ...
			})
	}
}