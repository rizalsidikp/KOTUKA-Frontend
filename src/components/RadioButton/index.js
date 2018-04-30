import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss'

class RadioButton extends Component {
	render() {
		const { label = '', checked = false, name = '', onChange = () => {} } = this.props
		return (
			<label className="radio-container font16 text-blue"  >{ label }
				<input type="radio" name={ name } checked={ checked } onChange={ onChange } />
				<span className="checkmark"></span>
			</label>
		)
	}
}

RadioButton.propTypes = {
	label : PropTypes.string,
	name : PropTypes.string,
	checked: PropTypes.bool,
	onChange: PropTypes.func
}

export default RadioButton