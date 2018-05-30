import * as constants from './constants'
import { fromJS } from 'immutable'

const INITIAL_STATE = fromJS({
	loading: false,
	user: {
		address: {
			origin_country: '',
			post_code: '',
			address: ''
		},
		avatar: '',
		birthday: '',
		createdAt: '',
		email: '',
		first_and_middle_name: '',
		identification_photo: null,
		id: 0,
		last_name: '',
		phone: '',
		phone_code: '',
		response: 0,
		trans_count: 0,
		updatedAt: '',
		verified: '',
		invalid: false,
		invalidMessage: ''
	}
})

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
	case constants.SET_LOADING:
		return state.set('loading',  action.payload.loading)
	case constants.SET_INITIAL_STATE: 
		return INITIAL_STATE
	case constants.SET_USER:
		return state.setIn(['user', 'address', 'origin_country'], action.payload.user.address ? action.payload.user.address.origin_country : '')
			.setIn(['user', 'address', 'post_code'], action.payload.user.address ? action.payload.user.address.post_code : '')
			.setIn(['user', 'address', 'address'], action.payload.user.address ? action.payload.user.address.address : '')
			.setIn(['user', 'avatar'], action.payload.user.avatar || '')
			.setIn(['user', 'birthday'], action.payload.user.birthday || '')
			.setIn(['user', 'createdAt'], action.payload.user.createdAt || '')
			.setIn(['user', 'email'], action.payload.user.email || '')
			.setIn(['user', 'first_and_middle_name'], action.payload.user.first_and_middle_name || '')
			.setIn(['user', 'id'], action.payload.user.id || 0)
			.setIn(['user', 'last_name'], action.payload.user.last_name || '')
			.setIn(['user', 'phone'], action.payload.user.phone || '')
			.setIn(['user', 'phone_code'], action.payload.user.phone_code || '')
			.setIn(['user', 'response'], action.payload.user.response || 0)
			.setIn(['user', 'trans_count'], action.payload.user.trans_count || 0)
			.setIn(['user', 'updatedAt'], action.payload.user.updatedAt || '')
			.setIn(['user', 'verified'], action.payload.user.verified || '')
			.setIn(['user', 'identification_photo'], action.payload.user.identification_photo || null)
	case constants.SET_ID_CARD:
		return state.setIn(['user', 'identification_photo'], action.payload.identification_photo)
	case constants.SET_INVALID:
		return state.set('invalid', action.payload.invalid)
			.set('invalidMessage', action.payload.invalidMessage)
	default: return state
	}
}