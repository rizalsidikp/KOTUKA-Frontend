import { createSelector } from 'reselect'

export const selectTransaction = () => state => state.transactionReducer

export const getLoading = () => createSelector(
	selectTransaction(),
	state => state.get('loading')
)

export const getInquiry = () => createSelector(
	selectTransaction(),
	state => state.get('inquiry')
)

export const getIsInquiry = () => createSelector(
	selectTransaction(),
	state => state.get('isInquiry')
)

export const getInquiries = () => createSelector(
	selectTransaction(),
	state => state.get('inquiries')
)


export const getStatuses = () => createSelector(
	selectTransaction(),
	state => state.get('statuses')
)