import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from '../Row'

import Select from 'react-select-plus'

import './style.scss'


class InputMoney extends Component {
	constructor(props) {
		super(props)
		this.state={
			selectedOption: '',
		}
	}
	handleChange = (selectedOption) => {
		this.setState({ selectedOption })
	}
	render() {
		const { selectedOption } = this.state
		const valueSelected = selectedOption && selectedOption.value

		const { disabled = false, value = 0, label = '', theme = 'white', onChange= () => {} } = this.props

		return (
			<div>
				<label className={ 'font20 font-weight-bold '.concat(theme === 'blue' ? 'text-blue' : 'text-white') }>{ label }</label>
				<Row className="im-row">
					<div className="col col-md-auto im-col no-padding">
						<Select
							className="im-select"
							name="form-field-name"
							value={ valueSelected }
							onChange={ this.handleChange }
							autosize={ false }
							options={ [
								{ value: 'one', label: 'One' },
								{ value: 'two', label: 'Two' },
							] }
						/>
					</div>
					<div className={ 'col d-flex '.concat(theme === 'blue' ? 'background-blue-light' : '') }>
						<input className={ 'im-money '.concat(theme === 'blue' ? 'background-blue-light' : '') } value={ value } disabled={ disabled } onChange={ onChange } />
					</div>
				</Row>
			</div>	
		)
	}
}

InputMoney.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	disabled: PropTypes.bool,
	theme: PropTypes.string,
	onChange: PropTypes.func
}

export default InputMoney