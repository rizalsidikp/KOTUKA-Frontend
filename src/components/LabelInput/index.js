import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DatePicker from 'react-datepicker'

import './style.scss'

class LabelInput extends Component {
	render() {
		const { name='', maxLength = 100, label = '', placeholder = 'Placeholder..', value = '', type = 'text', onChange = () => {}, disabled = false, noLabel = false, labelClassName=''  } = this.props
		return (
			<div className="d-block text-left">
				{
					!noLabel &&
					<label className={ 'font16 text-black-semi full-width no-margin font-weight-semi-bold '.concat(labelClassName) }>{ label }</label>
				}
				{
					type === 'textarea' ?
						<textarea name={ name } placeholder={ placeholder } value={ value } onChange={ onChange } disabled={ disabled } className={ 'li-input resize-none '.concat(this.props.invalid ? 'li-no-margin ' : '' ) } rows={ 4 }></textarea>
						:
						type === 'date' ?
							<DatePicker className="li-input" name={ name } placeholder={ placeholder } selected={ value } onChange={ onChange } disabled={ disabled }
								showMonthDropdown
								showYearDropdown
								dropdownMode="select"
								readOnly
							/>
							:
							<input maxLength={ maxLength } name={ name } className={ 'li-input '.concat(this.props.invalid ? 'li-no-margin ' : '' ) } type={ type } placeholder={ placeholder } value={ value } onChange={ onChange } disabled={ disabled } />
				}
				{
					this.props.invalid &&
					<label className="font14 text-red font-weight-semi-bold">{ this.props.invalidMessage }</label>
				}
			</div>	
		)
	}
}

LabelInput.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	labelClassName: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	type: PropTypes.string,
	maxLength: PropTypes.number,
	onChange: PropTypes.func,
	name: PropTypes.string,
	disabled: PropTypes.bool,
	noLabel: PropTypes.bool,
	invalid: PropTypes.bool,
	invalidMessage: PropTypes.string
}

export default LabelInput