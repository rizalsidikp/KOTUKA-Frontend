import * as constants from './constants'
import { fromJS } from 'immutable'

const INITIAL_STATE = fromJS({
	loading: false,
	user: {
		address: '',
		avatar: '',
		birthday: '',
		createdAt: '',
		email: '',
		first_and_middle_name: '',
		id: '',
		last_name: '',
		phone: '',
		response: '',
		trans_count: '',
		updatedAt: '',
		verified: ''
	}
})

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
	case constants.SET_LOADING:
		return state.set('loading',  action.payload.loading)
	case constants.SET_INITIAL_STATE: 
		return INITIAL_STATE
	case constants.SET_USER:
		return state.setIn(['user', 'address'], action.payload.user.address)
			.setIn(['user', 'avatar'], action.payload.user.avatar)
			.setIn(['user', 'birthday'], action.payload.user.birthday)
			.setIn(['user', 'createdAt'], action.payload.user.createdAt)
			.setIn(['user', 'email'], action.payload.user.email)
			.setIn(['user', 'first_and_middle_name'], action.payload.user.first_and_middle_name)
			.setIn(['user', 'id'], action.payload.user.id)
			.setIn(['user', 'last_name'], action.payload.user.last_name)
			.setIn(['user', 'phone'], action.payload.user.phone)
			.setIn(['user', 'response'], action.payload.user.response)
			.setIn(['user', 'trans_count'], action.payload.user.trans_count)
			.setIn(['user', 'updatedAt'], action.payload.user.updatedAt)
			.setIn(['user', 'verified'], action.payload.user.verified)
	default: return state
	}
}