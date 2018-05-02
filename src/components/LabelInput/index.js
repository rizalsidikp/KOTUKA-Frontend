import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DatePicker from 'react-datepicker'

import moment from 'moment'

import './style.scss'

class LabelInput extends Component {
	render() {
		const { name='', label = '', placeholder = 'Placeholder..', value = '', type = 'text', onChange = () => {}, disabled = false  } = this.props
		return (
			<div className="d-block">
				<label className="font16 text-secondary full-width no-margin font-weight-semi-bold">{ label }</label>
				{
					type === 'textarea' ?
						<textarea name={ name } placeholder={ placeholder } value={ value } onChange={ onChange } className="li-input resize-none" rows={ 4 }></textarea>
						:
						type === 'date' ?
							<DatePicker className="li-input" name={ name } placeholder={ placeholder } selected={ moment() } onChange={ onChange } />
							:
							<input name={ name } className="li-input" type={ type } placeholder={ placeholder } value={ value } onChange={ onChange } disabled={ disabled } />
				}
			</div>	
		)
	}
}

LabelInput.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	type: PropTypes.string,
	onChange: PropTypes.func,
	name: PropTypes.string,
	disabled: PropTypes.bool
}

export default LabelInput