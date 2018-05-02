import React, { Component } from 'react'
import InputMoney from '../InputMoney'
import PropTypes from 'prop-types'
import Row from '../Row'

import fx from 'money'

import config from './../../config'

import './style.scss'
import strings from '../../localizations'
import { LogoCircle } from './../../images'
import api from '../../services/api'

import accounting from 'accounting'

class FormInputMoney extends Component {
	constructor(props){
		super(props)
		this.state = {
			needMoney : '',
			haveTransfer: '',
			typingTimeout: 0,
			needChoice: 'GBP',
			haveChoice: 'IDR',
		}
	}

	convertMoney = (val) => {
		let needMoney = parseFloat(val)
		api.get('latest.json', { baseURL: config.BASE_URL_RATES, params: { app_id: config.RATES_ID } })
			.then((resp) => {
				fx.rates = resp.rates
				let haveTransfer = fx(parseFloat(needMoney)).from(this.state.needChoice).to(this.state.haveChoice)
				if(this.state.haveChoice === 'IDR'){
					haveTransfer = Math.round(haveTransfer)
					haveTransfer = accounting.formatMoney(haveTransfer,'', 0, ',')
				}else{
					// haveTransfer = Math.round(haveTransfer * 100) / 100
					// haveTransfer = haveTransfer.toString().split('.')
					// haveTransfer[0] = accounting.formatMoney(haveTransfer[0],'', 0, ',')
					// haveTransfer = haveTransfer.join('.')
					haveTransfer = Math.round(haveTransfer * 100) / 100
					haveTransfer = accounting.formatMoney(haveTransfer,'', 2, ',')
				}
				if(this.state.needChoice === 'IDR'){
					needMoney = Math.round(needMoney)
					needMoney = accounting.formatMoney(needMoney,'', 0, ',')
				}else{
					needMoney = Math.round(needMoney * 100) / 100
					needMoney = accounting.formatMoney(needMoney,'', 2, ',')
				}
				haveTransfer = haveTransfer.toString()
				needMoney = needMoney.toString()
				this.setState({
					needMoney,
					haveTransfer
				}) // ~8.0424
			})
	}

	onChangeMoney = (needMoney) => {
		this.setState({ needMoney, haveTransfer: 'Loading...' })
		if (this.state.typingTimeout) {
			clearTimeout(this.state.typingTimeout)
		}
		if(needMoney === ''){
			this.setState({haveTransfer : ''})
		}else{
			let money = new String(needMoney)
			this.setState({ 
				typingTimeout: setTimeout(() => {
					this.convertMoney(money.replace(/[^a-zA-Z 0-9.]+/g,''))
				}, 1000)
			})
		}
	}

	validateKey = (e) => {
		if(isNaN(e.key) && e.key !== '.' && e.key !== ','){
			e.preventDefault()
		}
	}

	onGetRates = () => {
		// oxr.set({ app_id: config.RATES_ID })
		// oxr.latest(function(props) {
		// 	// You can now use `oxr.rates`, `oxr.base` and `oxr.timestamp`
		// 	return 'tes'
		// })
	}

	onChangeSelected = (val, mode) => {
		if(mode === 'need'){
			this.setState({ needChoice: val.value })
		}
		if(mode === 'have'){
			this.setState({ haveChoice: val.value })
		}
		this.onChangeMoney(this.state.needMoney)
	}

	render() {
		const { theme = 'white' } = this.props
		return (
			<div>
				<Row className="fim-row">
					<div className="col">
						<InputMoney
							label={ strings.i_need }
							theme={ theme }
							value={ this.state.needMoney }
							selected={ this.state.needChoice }
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
							value={ this.state.haveTransfer }
							selected={ this.state.haveChoice }							
							onSelectChange={ (val) => this.onChangeSelected(val, 'have') }
							disabled
						/>
					</div>
				</Row>
				<Row>
					<div className="col col-xs-12 text-center">
						<button className="button button-yellow" onClick={ this.onGetRates }>{ strings.get_start }</button>
					</div>
				</Row>
			</div>
		)
	}
}

FormInputMoney.propTypes = {
	theme: PropTypes.string
}

export default FormInputMoney