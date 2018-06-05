import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from './../Home/selectors'
import * as actions from './../Home/actions'
import { getUser } from './../Header/selectors'
import PropTypes from 'prop-types'
import { convertMoneyString } from './../../services/helper'
import currenciesService from '../../services/currencies'

import './style.scss'
import FormInputMoney from './../../components/FormInputMoney'
import TradeBox from '../../components/TradeBox'
import Row from '../../components/Row'
import strings from '../../localizations'
import history from '../../history'
// import moment from 'moment-timezone'
import { getIsInquiry } from '../Transaction/selectors'
import { getTransactions } from '../Transaction/actions'
import { setPrompt } from '../Prompt/actions'

class Post extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currencies: []
		}
	}

	componentWillMount() {
		this.getCurrencies()	
		this.props.getTransactions(this.props.user.get('id'))			
	}


	getCurrencies = async() => {
		await this.props.setInitialState()		
		const response = await currenciesService.getCurrencies()
		const currencies = response.result
		this.setState({ currencies })
	}

	onStartTrading = async(page = 1) => {
		await this.props.setAmountNeedInt(convertMoneyString(this.props.amountNeed) || 0)
		await this.props.setAmountHaveInt(convertMoneyString(this.props.amountHave) || 0)
		const	need = this.props.chooseNeed.get('currency_alias')
		const	have =  this.props.chooseHave.get('currency_alias')
		this.props.getClosestTrade(need, have, this.props.amountNeedInt, this.props.amountHaveInt, page)
	}
	onPostTrade = async() => {
		if(this.props.isInquiry){
			this.props.setPrompt(true, strings.upps, strings.cannot_post)
		}else{
			history.push({
				pathname: '/dashboard/tradeconfirmation',
				state: { type: 'poster' }
			})
		}
	}

	onTradeClick = () => {
		if(this.props.isInquiry){
			this.props.setPrompt(true, strings.upps, strings.cannot_post)
		}else{
			history.push({
				pathname: '/dashboard/pickconfirmation',
				state: { type: 'picker' }
			})
		}
	}

	render() {
		return (
			<div className="container dashboard-container post-container">
				<FormInputMoney 
					selectedNeed={ this.props.chooseNeed }
					selectedHave={ this.props.chooseHave }
					onSelectNeed={ (chooseNeed) => this.props.setChooseNeed(chooseNeed) }
					onSelectHave={ (chooseHave) => this.props.setChooseHave(chooseHave) }
					amountNeed={ this.props.amountNeed }
					amountHave={ this.props.amountHave }
					onChangeNeed={ (amountNeed) => this.props.setAmountNeed(amountNeed) }
					onChangeHave={ (amountHave) => this.props.setAmountHave(amountHave) }
					convertMoney={ (val, selectedNeed, selectedHave, type) => this.props.convertMoney(val, selectedNeed, selectedHave, type) }					
					onStartTrading={ () => this.onStartTrading() }
					buttonDisabled={ this.props.loading }
					setLoading={ (loading) => this.props.setLoading(loading) }
					theme='secondary'
					currencies={ this.state.currencies }					
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
					onTradeClick={ this.onTradeClick }							
					currencies={ this.state.currencies }					
					theme='secondary'
					id_user={ this.props.user.get('id') }
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
	getUser: PropTypes.func,
	setPrompt: PropTypes.func,
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
	isInquiry: getIsInquiry(),
	user: getUser()
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
	convertMoney: (val, selectedNeed, selectedHave, type) => dispatch(actions.convertMoney(val, selectedNeed, selectedHave, type)),
	tradeSelected: (selectedTrades, trade) => dispatch(actions.tradeSelected(selectedTrades, trade)),
	removeTrade: (selectedTrades, index) => dispatch(actions.removeTrade(selectedTrades, index)),
	getTransactions: (id) => dispatch(getTransactions(id)),
	setPrompt: (prompt, header, text) => dispatch(setPrompt(prompt, header, text)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)