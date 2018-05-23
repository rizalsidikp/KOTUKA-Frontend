import * as constants from './constants'


export function setAlert(alert) {
	return { type: constants.SET_ALERT, payload: { alert } }
}

export function setAlertStatus(alert) {
	return async (dispatch) => {
		dispatch(setAlert(alert))
		if(alert){
			setTimeout(() => { 
				dispatch(setAlert(false))
			}, 5000)
		}
	}
}