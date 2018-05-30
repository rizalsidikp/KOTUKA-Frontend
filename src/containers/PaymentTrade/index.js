import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from './selectors'
import * as actions from './actions'
import Row from '../../components/Row'
import PropTypes from 'prop-types'
import strings from '../../localizations'
import TitleWithHr from '../../components/TitleWithHr'
import LabelValue from '../../components/LabelValue'
import { getUser } from '../Header/selectors'
import Loading from './../../components/Loading'
import { formatMoney, getCostFromCurrency, convertMoneyString } from '../../services/helper'
import getSymbolFromCurrency from 'currency-symbol-map'
import currenciesService from './../../services/currencies'
import accounting from 'accounting'
import Countdown from 'react-countdown-now'
import history from './../../history'
import tradingService from './../../services/trading'



class PaymentTrade extends Component {

	constructor(props) {
		super(props)
		this.state = {
			currencies: [],
			loading: true
		}
	}

	
	componentWillMount() {
		this.props.getInquiry(this.props.location.state.payment)
		this.getCurrencies()
	}
	
	getCurrencies = async() => {
		const response = await currenciesService.getCurrencies()
		const currencies = response.result
		this.setState({ currencies, loading: false })
	}

	onClickSend = async() => {
			this.props.sentMoney(this.props.inquiry.get('id'))
	}
	
	render() {
		const kotuka_fee = convertMoneyString(this.props.inquiry.get('total_amount_transfer')) - convertMoneyString(this.props.inquiry.get('have_amount'))
		if(!this.props.location.state){
			return <Redirect to="/" />
		}
		return (
			<div className="container dashboard-container">
				<Row className="justify-content-center">
					{
						this.props.loading || this.state.loading ?
							<div className="col col-md-6 card loading-page text-center">
								<Loading />
							</div>
							:
							<div className="col col-md-6 card">
								<h1 className="text-center font24 font-weight-bold text-black-semi no-margin">{ strings.transfer_mehtod }</h1>
								<hr />
								{/* {transfer detail} */}
								<TitleWithHr
									title={ strings.transfer_detail }
								/>
								<table className="p_line full-width">
									<tbody>
										{/* { you will get } */}
										<tr>
											<td className="tc-td font14 text-black-semi font-weight-bold">{ strings.will_get }</td>
											<td className="tc-td font16 text-primary text-right font-weight-bold">
												{ getSymbolFromCurrency(this.props.inquiry.get('need_currency')) + ' ' }
												{ formatMoney(this.props.inquiry.get('need_amount'), this.props.inquiry.get('need_currency')) }
											</td>
										</tr>
										{/* {amount to convert} */}
										<tr>
											<td className="tc-td font14 text-black-semi">{ strings.amount_to_convert } <br /> 
												<span className="font12 text-gray">
													{ strings.guaranted_rate + ' '  }
													{ getSymbolFromCurrency(this.props.inquiry.get('have_currency')) + ' 1 = ' }
													{ getSymbolFromCurrency(this.props.inquiry.get('need_currency')) + ' ' }
													{ accounting.formatMoney(this.props.inquiry.get('currency_rate'), '', this.props.inquiry.get('have_currency') === 'IDR' ? 7 : 2)}
												</span>
											</td>
											<td className="tc-td font16 text-primary text-right">
												{ getSymbolFromCurrency(this.props.inquiry.get('have_currency')) + ' ' }
												{ formatMoney(this.props.inquiry.get('have_amount'), this.props.inquiry.get('have_currency')) }
											</td>
										</tr>
										{/* {kotuka fee} */}
										<tr>
											<td className="tc-td font14 text-black-semi">{ strings.kotuka_fee } <br /> 
												<span className="font12 text-gray">
													({ strings.fee_percent + ' '  }
													{ getSymbolFromCurrency(this.props.inquiry.get('have_currency')) + ' ' }
													{ getCostFromCurrency(this.state.currencies, this.props.inquiry.get('have_currency')) }
													) + { strings.uniq_code }
												</span>
											</td>
											<td className="tc-td font16 text-primary text-right">
												{ getSymbolFromCurrency(this.props.inquiry.get('have_currency')) + ' ' }
												{ formatMoney(kotuka_fee, this.props.inquiry.get('have_currency')) }
											</td>
										</tr>
										{/* { have to transfer } */}
										<tr>
											<td className="tc-td font14 text-black-semi font-weight-bold">{ strings.you_have_to_transfer }</td>
											<td className="tc-td font16 text-primary text-right font-weight-bold">
												{ getSymbolFromCurrency(this.props.inquiry.get('have_currency')) + ' ' }
												{ formatMoney(this.props.inquiry.get('total_amount_transfer'), this.props.inquiry.get('have_currency')) }												
											</td>
										</tr>
									</tbody>
								</table>
								{/* {recipient detail} */}
								{/* <TitleWithHr
									title={ strings.recipient_detail }
								/>
								<table className="p_line full-width">
									<tbody>
										{ name }
										<tr>
											<td className="tc-td font14 text-black-semi">{ 'name' }</td>
											<td className="tc-td font16 text-primary text-right">
												Ismail Abdus Shobar
											</td>
										</tr>
										{ bank name }
										<tr>
											<td className="tc-td font14 text-black-semi">{ 'Bank Name' }</td>
											<td className="tc-td font16 text-primary text-right">
													Bank Name
											</td>
										</tr>
										{ bank account }
										<tr>
											<td className="tc-td font14 text-black-semi">{ strings.account_no }</td>
											<td className="tc-td font16 text-primary text-right">
												72218210022
											</td>
										</tr>
									</tbody>
								</table> */}
								<TitleWithHr
									title={ strings.kotuka_acc_detail }
								/>
								<Row>
									<div className="col col-md-6">
										<LabelValue
											label={ strings.to }
											value={ this.props.inquiry.get('payment_detail').paymentInfo ? this.props.inquiry.get('payment_detail').paymentInfo.account_name : ''  }
										/>
									</div>
									<div className="col col-md-6">
										{
											this.props.inquiry.get('payment_detail').payment_type === 'manual_transfer' ?
												<div>
													<LabelValue
														label={ strings.account_no }
														value={ this.props.inquiry.get('payment_detail').paymentInfo.account_detail.bank_account }
													/>
													{
														this.props.inquiry.get('payment_detail').paymentInfo.account_detail.sort_code &&
														<LabelValue
															label={ strings.sort_code }
															value={ this.props.inquiry.get('payment_detail').paymentInfo.account_detail.sort_code }
														/>
													}
												</div>
												: null
										}
									</div>
									<div className="col col-md-6">
										<LabelValue
											label={ strings.total_transfer }
											value={ formatMoney(this.props.inquiry.get('total_amount_transfer'), this.props.inquiry.get('have_currency')) }
											valueClassName="font20 font-weight-bold"
										/>
									</div>
									<div className="col col-md-6">
										<LabelValue
											label={ strings.time_limit }
											value={ <Countdown date={ this.props.inquiry.get('deadline_post') } /> }
											valueClassName="font20 font-weight-bold text-orange"
										/>
									</div>
								</Row>
								<div className="font12 text-gray">{ strings.the_money } ({ this.props.user.get('first_and_middle_name') + ' ' + this.props.user.get('last_name') })</div>
								<button disabled={ this.props.loading } className="button button-yellow" onClick={ this.onClickSend } >{ strings.have_sent_money }</button>
								<button disabled={ this.props.loading } className="button button-secondary-white" onClick={ () => history.replace('/dashboard/transaction') }>{ strings.will_send_money_later }</button>
							</div>
					}
				</Row>
			</div>	
		)
	}
}

PaymentTrade.propTypes = {
	location: PropTypes.object,
	getInquiry: PropTypes.func,
	sentMoney: PropTypes.func,
	user: PropTypes.object,
	loading: PropTypes.bool,
	inquiry: PropTypes.object
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.getLoading(),
	inquiry: selectors.getInquiry(),
	user: getUser(),
})

const mapDispatchToProps = (dispatch) => ({
	getInquiry: (id) => dispatch(actions.getInquiry(id)),
	sentMoney: (id) => dispatch(actions.sentMoney(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentTrade)