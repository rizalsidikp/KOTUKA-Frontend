import { createSelector } from 'reselect'

export const selectPrompt = () => state => state.promptReducer

export const getPrompt = () => createSelector(
	selectPrompt(),
	state => state.get('prompt')
)


export const getHeader = () => createSelector(
	selectPrompt(),
	state => state.get('header')
)


export const getText = () => createSelector(
	selectPrompt(),
	state => state.get('text')
)