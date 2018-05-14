import { createSelector } from 'reselect'

export const selectRecipient = () => state => state.recipientReducer

export const getLoading = () => createSelector(
	selectRecipient(),
	state => state.get('loading')
)

export const getRecipients = () => createSelector(
	selectRecipient(),
	state => state.get('recipients')
)