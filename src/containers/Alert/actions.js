import * as constants from './constants'


export function setAlert(alert, theme, message) {
	return { type: constants.SET_ALERT, payload: { alert, theme, message } }
}

export function setAlertStatus(alert, theme, message) {
	return async (dispatch) => {
		dispatch(setAlert(alert, theme, message))
		if(alert){
			setTimeout(() => { 
				dispatch(setAlert(false, theme, message))
			}, 5000)
		}
	}
}