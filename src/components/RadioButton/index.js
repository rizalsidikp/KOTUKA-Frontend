import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss'

class RadioButton extends Component {
	render() {
		const { label = '', checked = false, name = '', onChange = () => {}, onClick = () => {} } = this.props
		return (
			<label className="radio-container font16 text-secondary" onClick={ onClick }  >{ label }
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
	onChange: PropTypes.func,
	onClick: PropTypes.func,
}

export default RadioButton