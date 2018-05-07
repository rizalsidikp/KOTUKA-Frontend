import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from '../Row'

import Select from 'react-select-plus'

import { chunkArray } from './../../services/helper'

import './style.scss'
import currenciesService from '../../services/currencies'


class InputMoney extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currencies: []
		}
	}

	componentWillMount() {
		this.getCurrencies()
	}

	getCurrencies = async() => {
		const response = await currenciesService.getCurrencies()
		const currencies = response.result
		this.setState({ currencies })
	}

	renderItem = (props) => {
		return(
			<div className="Select-value">
				<img className="select-logo" src={ props.image } />
				<span className="Select-value-label">{ props.value }</span>
			</div>
		)
	}
	

	render() {
		const { disabled = false, value = 0, label = '', theme = 'white', onChange= () => {}, onKeyPress = () => {}, onSelectChange = () => {}, selected = 'GBP' } = this.props
		const options = chunkArray(this.state.currencies, 'currency_alias', 'currency_alias', 'country_flag')
		return (
			<div>
				<label className={ 'font20 font-weight-bold '.concat(theme === 'secondary' ? 'text-secondary' : 'text-white') }>{ label }</label>
				<Row className="im-row">
					<div className="col col-md-auto im-col no-padding">
						<Select
							className="im-select"
							name="form-field-name"
							value={ selected }
							clearable={ false }
							onChange={ onSelectChange }
							autosize={ false }
							options={ options }
							valueRenderer={ (props) => this.renderItem(props) }
						/>
					</div>
					<div className={ 'col d-flex '.concat(theme === 'secondary' ? 'background-secondary-light' : '') }>
						<input className={ 'im-money '.concat(theme === 'secondary' ? 'background-secondary-light' : '') } value={ value } disabled={ disabled } onChange={ onChange } onKeyPress={ onKeyPress } />
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
	onChange: PropTypes.func,
	onKeyPress: PropTypes.func,
	onSelectChange: PropTypes.func,
	selected: PropTypes.string
}

export default InputMoney