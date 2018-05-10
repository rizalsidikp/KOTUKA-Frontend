import * as constants from './constants'
import { fromJS } from 'immutable'

const INITIAL_STATE = fromJS({
	loading: false,
	inquiry: {
		id: 0,
		id_user: 0,
		need_amount: '0.00',
		need_currency: '',
		currency_rate: '0.00',
		have_amount: '0.00',
		have_currency: '',
		status: '',
		deadline_post: '',
	},
	isInquiry: false,
	isLiveTransaction: false,
	transactions: [],
	liveTransaction: {
		id: 0,
		on_focus: true,
		referrer_code: '',
		transaction_status: '',
		Inquiries: []
	}
})

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
	case constants.SET_LOADING:
		return state.set('loading',  action.payload.loading)
	case constants.SET_INITIAL_STATE: 
		return INITIAL_STATE
	case constants.SET_INQUIRY:
		return state.setIn(['inquiry', 'id'], action.payload.inquiry.id || 0)
			.setIn(['inquiry', 'id_user'], action.payload.inquiry.id_user || 0)
			.setIn(['inquiry', 'need_amount'], action.payload.inquiry.need_amount || '0.00')
			.setIn(['inquiry', 'need_currency'], action.payload.inquiry.need_currency || '')
			.setIn(['inquiry', 'currency_rate'], action.payload.inquiry.currency_rate || '0.00')
			.setIn(['inquiry', 'have_amount'], action.payload.inquiry.have_amount || '0.00')
			.setIn(['inquiry', 'have_currency'], action.payload.inquiry.have_currency || '')
			.setIn(['inquiry', 'status'], action.payload.inquiry.status || '')
			.setIn(['inquiry', 'deadline_post'], action.payload.inquiry.deadline_post || '')
	case constants.IS_INQUIRY:
		return state.set('isInquiry', action.payload.isInquiry)
	case constants.SET_LIVE_TRANSACTION:
		return state.setIn(['liveTransaction', 'id'], action.payload.liveTransaction.id || 0)
			.setIn(['liveTransaction', 'on_focus'], action.payload.liveTransaction.on_focus)
			.setIn(['liveTransaction', 'referrer_code'], action.payload.liveTransaction.referrer_code || '')
			.setIn(['liveTransaction', 'transaction_status'], action.payload.liveTransaction.transaction_status || '')
			.setIn(['liveTransaction', 'Inquiries'], action.payload.liveTransaction.Inquiries || [])
	case constants.IS_LIVE_TRANSACTION:
		return state.set('isLiveTransaction', action.payload.isLiveTransaction)
	case constants.SET_TRANSACTION:
		return state.set('transactions', action.payload.transactions)
	default: return state
	}
}