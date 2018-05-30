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

	onChangeMoney = (amount, type = 'need') => {
		this.props.setLoading(true)
		if(type === 'have'){
			this.props.onChangeHave(amount)
			this.props.onChangeNeed('Loading...')
		}else{
			this.props.onChangeNeed(amount)
			this.props.onChangeHave('Loading...')
		}
		if (this.state.typingTimeout) {
			clearTimeout(this.state.typingTimeout)
		}
		if(amount === ''){
			if(type === 'have'){
				this.props.onChangeNeed('')				
			}else{
				this.props.onChangeHave('')
			}
			this.props.setLoading(false)			
		}else{
			let money = new String(amount)
			this.setState({ 
				typingTimeout: setTimeout(() => {
					this.props.convertMoney(convertMoneyString(money), this.props.selectedNeed.get('currency_alias'), this.props.selectedHave.get('currency_alias'), type)
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
			if(val.currency_alias === this.props.selectedHave.get('currency_alias')){
				this.props.onSelectHave(this.props.selectedNeed.toJSON())
			}
			this.props.onSelectNeed(val)
		}
		if(mode === 'have'){
			if(val.currency_alias !== this.props.selectedNeed.get('currency_alias')){
				this.props.onSelectHave(val)
			}
		}
		this.onChangeMoney(this.props.amountNeed)
	}

	render() {
		const { theme = 'white', buttonDisabled = false } = this.props
		return (
			<div>
				<Row className={ theme === 'confirmation' ? 'no-margin' : 'fim-row' }>
					<div 
						className={ theme === 'confirmation' ? 'col col-xs-12 col-md-12' :'col' }
					>
						<InputMoney
							label={ strings.i_need }
							theme={ theme }
							value={ this.props.amountNeed }
							selected={ this.props.selectedNeed.get('currency_alias') }
							onSelectChange={ (val) => this.onChangeSelected(val, 'need') }
							onKeyPress={ this.validateKey }
							onChange={ (e) => this.onChangeMoney(e.target.value, 'need') }
							currencies={ this.props.currencies }
							invalidMin={ this.props.invalidMinNeed }
							invalidMax={ this.props.invalidMaxNeed }
							data={ this.props.selectedNeed }							
						/>
					</div>
					{
						theme !== 'confirmation' &&
						<div className="col col-md-auto no-padding d-flex align-items-center fim-center">
							<img src={ LogoCircle } />
						</div>
					}
					<div
						className={ theme === 'confirmation' ? 'col col-xs-12 col-md-12' :'col' }						
					>
						<InputMoney 
							label={ strings.you_have_to_transfer }
							theme={ theme }
							value={ this.props.amountHave }
							selected={ this.props.selectedHave.get('currency_alias') }
							onSelectChange={ (val) => this.onChangeSelected(val, 'have') }
							onKeyPress={ this.validateKey }							
							onChange={ (e) => this.onChangeMoney(e.target.value, 'have') }
							currencies={ this.props.currencies }
							invalidMin={ this.props.invalidMinHave }
							invalidMax={ this.props.invalidMaxHave }
							data={ this.props.selectedHave }
						/>
					</div>
				</Row>
				{
					theme !== 'confirmation' &&
					<Row>
						<div className="col col-xs-12 text-center">
							<button className="button button-yellow" onClick={ this.props.onStartTrading } disabled={ buttonDisabled }>{ this.props.buttonText }</button>
						</div>
					</Row>
				}
			</div>
		)
	}
}

FormInputMoney.propTypes = {
	theme: PropTypes.string,
	selectedNeed: PropTypes.object,
	selectedHave: PropTypes.object,
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
	buttonText: PropTypes.string,
	currencies: PropTypes.array,
	invalidMinHave: PropTypes.bool,
	invalidMaxHave: PropTypes.bool,
	invalidMinNeed: PropTypes.bool,
	invalidMaxNeed: PropTypes.bool,
}

export default FormInputMoney