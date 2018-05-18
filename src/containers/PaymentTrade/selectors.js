import { createSelector } from 'reselect'

export const selectPayment = () => state => state.paymentTradeReducer

export const getLoading = () => createSelector(
	selectPayment(),
	state => state.get('loading')
)

export const getInquiry = () => createSelector(
	selectPayment(),
	state => state.get('inquiry')
)