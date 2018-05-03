import React from 'react'
import moment from 'moment'


/**
 *  Set local storage item with time stamp
 */
export function setHtmlStorage(name, value, expires) {
	// Set default expiration to 1 hour if undefined or null
	if (expires === undefined || expires === 'null') { expires = 3600}
	// Schedule when the token should be expired
	const date = new Date()
	const schedule = Math.round((date.setSeconds(date.getSeconds() + expires)) / 1000)
	// Set the actual value as well as the time
	localStorage.setItem(name, value)
	localStorage.setItem(`${name}_time`, schedule)
}

/**
 * Remove local storage item and time stamp
 */
export function removeHtmlStorage(name) {
	localStorage.removeItem(name)
	localStorage.removeItem(`${name}_time`)
}

/**
 *  Check the expiration status of a local storage item
 */
export function statusHtmlStorage(name) {
	// Get current time
	const date = new Date()
	const current = Math.round(+date / 1000)
	// Pull the storage item's expiration
	let stored_time = localStorage.getItem(`${name}_time`)
	if (!stored_time === undefined || stored_time === 'null') { stored_time = 0}
	// Determine if it is expired
	if (stored_time < current) {
		// If expired, remove it and return false
		removeHtmlStorage(name)
		return false
	}
	// If not, return true
	return 1
}

/**
 *  validateEmail
 *  Check if an email address is valid
 *
 *  param { email } string
 */
export function validateEmail(email) {
	const regex = /^(([^<>()\[\]\\.,\s@"]+(\.[^<>()\[\]\\.,:s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return regex.test(email)
}


/**
 * method to validate vocal letter and length
 * check if the string has vocal letter
 * @param {Stirng} inputString
 * @param {Int} length default = 3
 * 
 * @return {Boolean}
*/
export function validateVocalLetter(inputString, length = 3) {
	return inputString.length >= length && (/[aiueoAIUEO]/).test(inputString.trim())
}


/**
* method to validate numbers and length
* check if the string just numbers
* @param {Stirng} inputString
* @param {Int} length default = 3
* 
* @return {Boolean}
*/
export function validateNumber(inputNumber, length = 3) {
	return (/^[0-9]+$/).test(inputNumber.trim()) && inputNumber.length >= length
}


/**
 * validate phone number format
 * @param {String} phoneNumber
 * 
 * @return {Boolean}
*/
export function validatePhoneNumber(phoneNumber) {
	return (/(\()?(\+62|62|0)(\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/).test(phoneNumber)
}

/**
 * make array 2 dimension for dropdown list
 * with section title
 * @param {Array} list
 * @param {String} titleKey title section list
 * @param {String} valueKey child section list
 * 
 * @return {Array}
*/
export function chunkArray(list = [], titleKey, valueKey, imageKey) {
	list.sort(compare)
	return list.reduce((carry, data, index) => {
		carry.push({
			label:
			<div className="Select-value">
				<img className="select-logo" src={ data[imageKey] } />
				<span className="text-black font-weight-bold">{ data[titleKey] }</span>
			</div>,
			value: data[valueKey],
			index
		})
		return carry

	}, [])
}

/**
 * make array 2 dimension for dropdown list
 * with section title
 * @param {Array} list
 * @param {String} titleKey title section list
 * @param {String} name child section list
 * @param {String} code child section list
 * 
 * @return {Array}
 *  uppercaseFirst(data[valueKey])
*/

/**
 * use this function with array.filter
 *  example: array.filter(obj => filterOrigin(obj.string_property))
 * 
 * @param {String} cityname
*/
export function filterOrigin(cityname) {
	switch (cityname) {
	case 'medan' : return true
	case 'binjai' : return true
	case 'padang' : return true
	case 'pekanbaru' : return true
	case 'palembang' : return true
	case 'cilegon' : return true
	case 'serang' : return true
	case 'jakarta' : return true
	case 'bekasi' : return true
	case 'purwakarta' : return true
	case 'karawang' : return true
	case 'bandung' : return true
	case 'kab. bandung': return true
	case 'cirebon' : return true
	case 'semarang' : return true
	case 'solo' : return true
	case 'yogyakarta' : return true
	case 'malang' : return true
	case 'surabaya' : return true
	case 'jember' : return true
	case 'banyuwangi' : return true
	case 'balikpapan' : return true
	case 'makassar' : return true
	default: return false
	}
}

/**
 * function to uppercase first letter
 * @param {String} str 'hello'
 * 
 * @return {Srring} 'Hello'
 */
export function uppercaseFirst(str = 'undefined') {
	const words = str.split(' ')
	return words.map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
}

/**
 * validate time departure and arrival
 * @param {Date} departure
 * @param {Date} arrival
*/
export function validateTime(departure, arrival) {
	return parseFloat(moment(departure).format('x')) < parseFloat(moment(arrival).format('x'))
}


/**
 * validate time departure and arrival
 * @param {File} string
 * @param {RegEx} cutomRegex
*/
export function validateRegex(string, customRegex) {
	const regex = customRegex || /(\.jpeg\.|pdf|\.png|\.jpg|\.JPG|\.JPEG|\.PNG|\.PDF)/g
	return regex.test(string)
}

// sorting origin destination
export function compare(a,b) {
	if(a.region < b.region){
		return -1
	}
	if(a.region > b.region){
		return 1
	}
	return 0
}

export function convertMoneyString(money) {
	return money.replace(/[^a-zA-Z 0-9.]+/g,'')
}
