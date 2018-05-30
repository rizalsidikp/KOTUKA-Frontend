import * as constants from './constants'


export function setPrompt(prompt, header, text) {
	return { type: constants.SET_PROMPT, payload: { prompt, header, text } }
}