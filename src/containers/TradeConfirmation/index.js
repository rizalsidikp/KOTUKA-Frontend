import React, { Component } from 'react'
import { Collapse } from 'react-collapse'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from './selectors'
import * as actions from './actions'
import PropTypes from 'prop-types'
import Select from 'react-select-plus'
import accounting from 'accounting'
import getSymbolFromCurrency from 'currency-symbol-map'
import moment from 'moment-timezone'

import Row from '../../components/Row'

import './style.scss'
import strings from '../../localizations'
import TradeCard from '../../components/TradeCard'
import LabelInput from '../../components/LabelInput'
// import RadioButton from '../../components/RadioButton'
import ModalRecipient from '../../components/ModalRecipient'
import { chunkArray, convertMoneyString } from '../../services/helper'
import { getSelectedTrades } from '../Home/selectors'
import { getUser } from '../Header/selectors'

class TradeConfirmation extends Component {
	constructor(props) {
		super(props)
		this.state={
			collapse : 1,
			checked: 'myself',
			modalRecipient: false,
			first_n_midle_name: 'Rizal',
			last_name: 'Sidik',
			account_no: '09889823',
			// iban: '111999',
			description: 'Untuk Saya',
		}
	}
	componentWillMount() {
		this.props.getPurpose()
	}

	onPickTrade = (need_amount, have_amount) => {
		need_amount = convertMoneyString(need_amount)
		have_amount = convertMoneyString(have_amount)
		const zone_name =  moment.tz.guess()
		const timezone = moment.tz(zone_name)._z.name
		let payment_detail = {
			payment_type : 'manual_transfer',
			gross_amount: have_amount
		}
		let account_info = {
			account_no : this.state.account_no,
			iban :  '92ie9i29ei92ie92i9e2i9ei29ei92ei9'
		}
		let trade_with = []
		this.props.selectedTrade.forEach(trade => {
			trade_with.push(trade.id)
		})
		payment_detail = JSON.stringify(payment_detail)
		account_info = JSON.stringify(account_info)
		trade_with = JSON.stringify(trade_with)
		this.props.pickTrade(
			this.props.user.get('id'), need_amount, this.props.selectedTrade[0].have_currency,
			this.props.selectedTrade[0].currency_rate, have_amount, this.props.selectedTrade[0].need_currency, 
			payment_detail, this.props.selectedPurpose.get('text_purpose'),
			2048390.00, account_info, this.state.first_n_midle_name, this.state.last_name, this.state.description,
			trade_with, timezone
		)
	}



	render() {	
		const options = chunkArray(this.props.purpose, 'text_purpose', 'id', '')
		let you_will_get = 0, you_transfer = 0
		if(this.props.selectedTrade.length > 0){
			you_will_get = this.props.selectedTrade[0].have_amount
			if(this.props.selectedTrade[0].have_currency === 'IDR'){
				you_will_get = Math.round(you_will_get)
				you_will_get = accounting.formatMoney(you_will_get,'', 0, ',')
			}else{
				you_will_get = Math.round(you_will_get * 100) / 100
				you_will_get = accounting.formatMoney(you_will_get,'', 2, ',')
			}
			you_transfer = this.props.selectedTrade[0].need_amount
			if(this.props.selectedTrade[0].need_currency === 'IDR'){
				you_transfer = Math.round(you_transfer)
				you_transfer = accounting.formatMoney(you_transfer,'', 0, ',')
			}else{
				you_transfer = Math.round(you_transfer * 100) / 100
				you_transfer = accounting.formatMoney(you_transfer,'', 2, ',')
			}
		}
		return (
			<div className="container dashboard-container">
				<Row className="justify-content-center">
					<div className="col col-md-8">
						<label className="font14 text-secondary clickable full-width text-right">{ strings.cancel }</label>
						<Row>
							<div className="col col-md-auto trade-c-line-top">
								<div className={ this.state.collapse === 1 ? 'trade-c-circle-active' : 'trade-c-circle' } onClick={ () => this.setState({ collapse: 1 }) } />
							</div>
							<div className={ 'col trade-c-box '.concat(this.state.collapse === 1 ? 'background-secondary-light' : '') }>
								<Collapse isOpened={ true }>
									<div className={ 'font14 '.concat(this.state.collapse === 1 ? 'text-secondary font-weight-bold' : 'text-black-semi') }>{ strings.recipient }</div>
									{
										this.state.collapse === 1 &&
										<div>
											<LabelInput 
												name="first_and_middle_name" 
												placeholder={ strings.first_n_midle_name } 
												label={ strings.first_n_midle_name } 
												value={ this.state.first_n_midle_name } 
												onChange={ (e) => this.setState({ first_n_midle_name: e.target.value }) }
											/>
											<LabelInput 
												name="last_name" 
												placeholder={ strings.last_name } 
												label={ strings.last_name } 
												value={ this.state.last_name } 
												onChange={ (e) => this.setState({ last_name: e.target.value }) }
											/>
											<LabelInput 
												name="account_no" 
												placeholder={ strings.account_no } 
												label={ strings.account_no } 
												value={ this.state.account_no } 
												onChange={ (e) => this.setState({ account_no: e.target.value }) }
											/>
											<LabelInput 
												name="description" 
												placeholder={ strings.description } 
												label={ strings.description } 
												value={ this.state.description } 
												onChange={ (e) => this.setState({ description: e.target.value }) }
											/>
										</div>
									}
								</Collapse>
							</div>
						</Row>
						<Row>
							<div className="col col-md-auto trade-c-line">
								<div className={ this.state.collapse === 2 ? 'trade-c-circle-active' : 'trade-c-circle' } onClick={ () => this.setState({ collapse: 2 }) } />
							</div>
							<div className={ 'col trade-c-box '.concat(this.state.collapse === 2 ? 'background-secondary-light' : '') }>
								<Collapse isOpened={ true }>
									<div className={ 'font14 '.concat(this.state.collapse === 2 ? 'text-secondary font-weight-bold' : 'text-black-semi') }>{ strings.purpose }</div>
									{
										this.state.collapse === 2 &&
										<div>
											<Select
												name="form-field-name"
												value={ this.props.selectedPurpose.get('id') }
												clearable={ false }
												onChange={ (val) => this.props.setSelectedPurpose(val) }
												autosize={ false }
												options={ options }
											/>
											{
												this.props.selectedPurpose.get('text_purpose') === 'Other' &&
												<LabelInput name='other' label={ strings.other } placeholder={ strings.other } value={ this.state.other } onChange={ (e) => this.setState({ other: e.target.value }) } />											
											}
										</div>
									}
								</Collapse>
							</div>
						</Row>
						<Row>
							<div className="col col-md-auto trade-c-line-bottom">
								<div className={ this.state.collapse === 3 ? 'trade-c-circle-active' : 'trade-c-circle' } onClick={ () => this.setState({ collapse: 3 }) } />
							</div>
							<div className={ 'col trade-c-box '.concat(this.state.collapse === 3 ? 'background-secondary-light' : '') }>
								<Collapse isOpened={ true }>
									<div className={ 'font14 '.concat(this.state.collapse === 3 ? 'text-secondary font-weight-bold' : 'text-black-semi') }>{ strings.review }</div>
									{
										this.state.collapse === 3 &&
										<div>
											<Row>
												{
													this.props.selectedTrade && this.props.selectedTrade.map((trade, tradeIndex) => {
														return(
															<TradeCard 
																key={ tradeIndex }
																data={ trade }
																withoutSelect
															/>
														)
													})
												}
											</Row>
											<Row>
												<div className="col col-md-6 font12 text-primary font-weight-bold">
													{ strings.will_get } &emsp; <span className="font16">{ getSymbolFromCurrency(this.props.selectedTrade[0].have_currency) } { you_will_get }</span>
												</div>
												<div className="col col-md-6 font12 text-primary font-weight-bold">
													{ strings.you_have_to_transfer } &emsp; <span className="font16">{ getSymbolFromCurrency(this.props.selectedTrade[0].need_currency) } { you_transfer }</span>
												</div>
											</Row>
											<br />
											<div className="text-center">
												<button className="button-xs button-yellow" onClick={ () => this.onPickTrade(you_will_get, you_transfer) }>Accept</button>
											</div>
										</div>
									}
								</Collapse>
							</div>
						</Row>
					</div>
				</Row>
				<ModalRecipient
					open={ this.state.modalRecipient }
					onClose={ () => this.setState({ modalRecipient: false }) }
				/>
			</div>
		)
	}
}

TradeConfirmation.propTypes = {
	purpose: PropTypes.any,
	selectedPurpose: PropTypes.object,
	selectedTrade: PropTypes.any,
	user: PropTypes.object,
	//funct
	getPurpose: PropTypes.func,
	setSelectedPurpose: PropTypes.func,
	pickTrade: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
	purpose: selectors.getPurpose(),
	selectedPurpose: selectors.getSelectedPurpose(),
	selectedTrade: getSelectedTrades(),
	user: getUser()
})

const mapDispatchToProps = (dispatch) => ({
	getPurpose: () => dispatch(actions.getPurpose()),
	setSelectedPurpose: (selectedPurpose) => dispatch(actions.setSelectedPurpose(selectedPurpose)),
	pickTrade : (
		id_user, need_amount, need_currency, 
		currency_rate, have_amount, have_currency, 
		payment_detail, trade_purpose, total_amount_transfer,
		account_info, first_and_middle_name, last_name,
		description, trade_with, timezone) => dispatch(actions.pickTrade(
		id_user, need_amount, need_currency, 
		currency_rate, have_amount, have_currency, 
		payment_detail, trade_purpose, total_amount_transfer,
		account_info, first_and_middle_name, last_name,
		description, trade_with, timezone))
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeConfirmation)