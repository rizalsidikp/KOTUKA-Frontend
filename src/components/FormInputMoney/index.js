import React, { Component } from 'react'
import InputMoney from '../InputMoney'
import PropTypes from 'prop-types'
import Row from '../Row'
import { convertMoneyString } from './../../services/helper'


import './style.scss'
import strings from '../../localizations'
import { LogoCircle } from './../../images'

class FormInputMoney extends Component {
	constructor(props){
		super(props)
		this.state = {
			typingTimeout: 0,
		}
	}

	onChangeMoney = (amountNeed) => {
		this.props.setLoading(true)
		this.props.onChangeNeed(amountNeed)
		this.props.onChangeHave('Loading...')
		if (this.state.typingTimeout) {
			clearTimeout(this.state.typingTimeout)
		}
		if(amountNeed === ''){
			this.props.onChangeHave('')
			this.props.setLoading(false)			
		}else{
			let money = new String(amountNeed)
			this.setState({ 
				typingTimeout: setTimeout(() => {
					this.props.convertMoney(convertMoneyString(money), this.props.selectedNeed, this.props.selectedHave)
				}, 1000)
			})
		}
	}

	validateKey = (e) => {
		if(isNaN(e.key) && e.key !== '.' && e.key !== ','){
			e.preventDefault()
		}
	}

	onChangeSelected = (val, mode) => {
		if(mode === 'need'){
			this.props.onSelectNeed(val)
		}
		if(mode === 'have'){
			this.props.onSelectHave(val)
		}
		this.onChangeMoney(this.props.amountNeed)
	}

	render() {
		const { theme = 'white', buttonDisabled = false } = this.props
		return (
			<div>
				<Row className="fim-row">
					<div className="col">
						<InputMoney
							label={ strings.i_need }
							theme={ theme }
							value={ this.props.amountNeed }
							selected={ this.props.selectedNeed }
							onSelectChange={ (val) => this.onChangeSelected(val, 'need') }
							onKeyPress={ this.validateKey }
							onChange={ (e) => this.onChangeMoney(e.target.value) }
						/>
					</div>
					<div className="col col-md-auto no-padding d-flex align-items-center fim-center">
						<img src={ LogoCircle } />
					</div>
					<div className="col">
						<InputMoney 
							label={ strings.you_have_to_transfer }
							theme={ theme }
							value={ this.props.amountHave }
							selected={ this.props.selectedHave }							
							onSelectChange={ (val) => this.onChangeSelected(val, 'have') }
							disabled
						/>
					</div>
				</Row>
				<Row>
					<div className="col col-xs-12 text-center">
						<button className="button button-yellow" onClick={ this.props.onStartTrading } disabled={ buttonDisabled }>{ this.props.buttonText }</button>
					</div>
				</Row>
			</div>
		)
	}
}

FormInputMoney.propTypes = {
	theme: PropTypes.string,
	selectedNeed: PropTypes.string,
	selectedHave: PropTypes.string,
	onSelectNeed: PropTypes.func,
	onSelectHave: PropTypes.func,
	amountNeed: PropTypes.string,
	amountHave: PropTypes.string,
	onChangeNeed: PropTypes.func,
	onChangeHave: PropTypes.func,
	convertMoney: PropTypes.func,
	onStartTrading: PropTypes.func,
	buttonDisabled: PropTypes.bool,
	setLoading: PropTypes.func,
	buttonText: PropTypes.string
}

export default FormInputMoney