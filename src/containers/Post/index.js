import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from './../Home/selectors'
import * as actions from './../Home/actions'
import { getLoading } from './selectors'
import { postTrade } from './actions'
import { getUser } from './../Header/selectors'
import PropTypes from 'prop-types'
import { convertMoneyString } from './../../services/helper'

import './style.scss'
import FormInputMoney from './../../components/FormInputMoney'
import TradeBox from '../../components/TradeBox'
import Row from '../../components/Row'
import strings from '../../localizations'
import history from '../../history'
import moment from 'moment-timezone'
import { getIsInquiry, getIsLiveTransaction } from '../Transaction/selectors'
import { getTransactions } from '../Transaction/actions'

class Post extends Component {
	componentWillMount() {
		this.props.getTransactions(this.props.user.get('id'))
	}
	onStartTrading = async(page = 1) => {
		await this.props.setAmountNeedInt(convertMoneyString(this.props.amountNeed) || 0)
		await this.props.setAmountHaveInt(convertMoneyString(this.props.amountHave) || 0)
		const	need = this.props.chooseNeed.get('currency_alias')
		const	have =  this.props.chooseHave.get('currency_alias')
		this.props.getClosestTrade(need, have, this.props.amountNeedInt, this.props.amountHaveInt, page)
	}
	onPostTrade = async() => {
		var zone_name =  moment.tz.guess()
		var timezone = moment.tz(zone_name)._z.name
		await this.props.postTrade(this.props.user.get('id'), convertMoneyString(this.props.amountNeed), this.props.chooseNeed.get('currency_alias'),	this.props.rate,	convertMoneyString(this.props.amountHave),	this.props.chooseHave.get('currency_alias'), timezone)
		this.props.getTransactions(this.props.user.get('id'))		
	}
	render() {
		console.log('inq = ', this.props.isInquiry, ', live = ', this.props.isLiveTransactions)
		if(this.props.isInquiry || this.props.isLiveTransactions){
			return(
				<div>Gaboleh Post Coy</div>
			)
		}
		return (
			<div className="container dashboard-container post-container">
				<FormInputMoney 
					selectedNeed={ this.props.chooseNeed.get('currency_alias') }
					selectedHave={ this.props.chooseHave.get('currency_alias') }
					onSelectNeed={ (chooseNeed) => this.props.setChooseNeed(chooseNeed) }
					onSelectHave={ (chooseHave) => this.props.setChooseHave(chooseHave) }
					amountNeed={ this.props.amountNeed }
					amountHave={ this.props.amountHave }
					onChangeNeed={ (amountNeed) => this.props.setAmountNeed(amountNeed) }
					onChangeHave={ (amountHave) => this.props.setAmountHave(amountHave) }
					convertMoney={ (val, selectedNeed, selectedHave) => this.props.convertMoney(val, selectedNeed, selectedHave) }
					onStartTrading={ () => this.onStartTrading() }
					buttonDisabled={ this.props.loading }
					setLoading={ (loading) => this.props.setLoading(loading) }
					theme='secondary'
					buttonText={ strings.search } 
				/>
				{
					!this.props.isSearching &&
					<Row>
						<label className="font20 text-primary full-width text-center font-weight-bold">or</label>
						<button className='mx-auto button button-primary' disabled={ this.props.postLoading } onClick={ this.onPostTrade }>{ strings.create_post }</button>
					</Row>
				}
				<TradeBox 
					closestTrade={ this.props.closestTrade }
					selectedTrades={ this.props.selectedTrades }
					onSelectTrade={ (trade) => this.props.tradeSelected(this.props.selectedTrades, trade) }
					onRemoveTrade={ (index) => this.props.removeTrade(this.props.selectedTrades, index) }
					loading={ this.props.isGettingTrade }
					isSearching={ this.props.isSearching }
					detailPage={ this.props.detailPage }
					onStartTrading={ (page) => this.onStartTrading(page) }
					createPost= { this.onPostTrade }		
					onTradeClick={ () => history.push('/dashboard/tradeconfirmation') }							
					theme='secondary'
				/>
			</div>
		)
	}
}

Post.propTypes = {
	loading: PropTypes.bool,
	amountNeed: PropTypes.string,
	amountHave: PropTypes.string,
	amountNeedInt: PropTypes.number,
	amountHaveInt: PropTypes.number,
	chooseNeed: PropTypes.object,
	chooseHave: PropTypes.object,
	closestTrade: PropTypes.any,
	selectedTrades: PropTypes.any,
	isSearching: PropTypes.bool,
	detailPage: PropTypes.object,
	isGettingTrade: PropTypes.bool,
	postLoading: PropTypes.bool,
	user: PropTypes.object,
	isInquiry: PropTypes.bool,
	isLiveTransactions: PropTypes.bool,
	rate: PropTypes.number,
	//function
	setInitialState: PropTypes.func,
	setAmountNeed: PropTypes.func,
	setAmountHave: PropTypes.func,
	setAmountNeedInt: PropTypes.func,
	setAmountHaveInt: PropTypes.func,
	setChooseNeed: PropTypes.func,
	setChooseHave: PropTypes.func,
	getClosestTrade: PropTypes.func,
	convertMoney: PropTypes.func,
	setLoading: PropTypes.func,
	tradeSelected: PropTypes.func,
	removeTrade: PropTypes.func,
	postTrade: PropTypes.func,
	getTransactions: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.getLoading(),
	amountNeed: selectors.getAmountNeed(),
	amountHave: selectors.getAmountHave(),
	amountNeedInt: selectors.getAmountNeedInt(),
	amountHaveInt: selectors.getAmountHaveInt(),
	chooseNeed: selectors.getChooseNeed(),
	chooseHave: selectors.getChooseHave(),
	closestTrade: selectors.getClosestTrade(),
	selectedTrades: selectors.getSelectedTrades(),
	detailPage: selectors.getDetailPage(),
	isSearching: selectors.getIsSearching(),
	isGettingTrade: selectors.getIsGettingTrade(),
	rate: selectors.getRate(),	
	postLoading: getLoading(),
	user: getUser(),
	isInquiry: getIsInquiry(),
	isLiveTransactions: getIsLiveTransaction()
})

const mapDispatchToProps = (dispatch) => ({
	setInitialState: () => dispatch(actions.setInitialState()),
	setAmountNeed:(amountNeed) => dispatch(actions.setAmountNeed(amountNeed)),
	setAmountHave: (amountHave) => dispatch(actions.setAmountHave(amountHave)),
	setAmountNeedInt:(amountNeedInt) => dispatch(actions.setAmountNeedInt(amountNeedInt)),
	setAmountHaveInt: (amountHaveInt) => dispatch(actions.setAmountHaveInt(amountHaveInt)),
	setChooseNeed: (chooseNeed) => dispatch(actions.setChooseNeed(chooseNeed)),
	setChooseHave: (chooseHave) => dispatch(actions.setChooseHave(chooseHave)),
	getClosestTrade: (need, have, amount, transfer, page) => dispatch(actions.getClosestTrade(need, have, amount, transfer, page)),
	setLoading: (loading) => dispatch(actions.setLoading(loading)),
	convertMoney: (val, selectedNeed, selectedHave) => dispatch(actions.convertMoney(val, selectedNeed, selectedHave)),
	tradeSelected: (selectedTrades, trade) => dispatch(actions.tradeSelected(selectedTrades, trade)),
	removeTrade: (selectedTrades, index) => dispatch(actions.removeTrade(selectedTrades, index)),
	postTrade: (id_user, need_amount, need_currency, currency_rate, have_amount, have_currency, timezone) => dispatch(postTrade(id_user, need_amount, need_currency, currency_rate, have_amount, have_currency, timezone)),
	getTransactions: (id) => dispatch(getTransactions(id))	
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)