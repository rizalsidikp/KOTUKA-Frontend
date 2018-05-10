import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from './selectors'
import * as actions from './actions'
import PropTypes from 'prop-types'

import './style.scss'
import Row from '../../components/Row'
import TransactionCard from '../../components/TransactionCard'
import { getUser } from '../Header/selectors'
import currenciesService from './../../services/currencies'

class Transaction extends Component {

	constructor(props){
		super(props)
		this.state = {
			currencies: []
		}
	}

	componentWillMount(){
		// firebaseService.getLiveTransaction()
		this.getTransactions()
		this.getCurrencies()
	}

	getCurrencies = async() => {
		const response = await currenciesService.getCurrencies()
		const currencies = response.result
		this.setState({ currencies })
	}

	getTransactions = async() => {
		await this.props.getTransactions(this.props.user.get('id')) 
	}
	
	render() {
		return (
			<div className="container dashboard-container">
				<Row className="justify-content-center">
					<div className="col col-md-8">
						{
							this.props.isInquiry &&
							<TransactionCard 
								status="Waiting for picker"
								need_currency={ this.props.inquiry.get('need_currency') }
								have_currency={ this.props.inquiry.get('have_currency') }
								will_get={ this.props.inquiry.get('need_amount') }
								have_transfer={ this.props.inquiry.get('have_amount') }
								currencies={ this.state.currencies }
							/>
						}
						<div>ini yg live</div>
						{
							this.props.isLiveTransaction &&
							<TransactionCard 
								status={ this.props.liveTransaction.get('transaction_status') }
								live
								need_currency={ this.props.transactions[0].Inquiries[0].need_currency }
								have_currency={ this.props.transactions[0].Inquiries[0].have_currency }
								will_get={ this.props.transactions[0].Inquiries[0].need_amount }
								have_transfer={ this.props.transactions[0].Inquiries[0].have_amount }
								inquiries={ this.props.liveTransaction.get('Inquiries') }
								id_user={ this.props.user.get('id') }
								currencies={ this.state.currencies }
							/>
						}
						<div>ini yg engga</div>
						{
							this.props.transactions && this.props.transactions.length > 0 &&
							this.props.transactions.map((transaction, index) => {
								if(this.props.isLiveTransaction && index === 0){
									return
								}
								return(
									<TransactionCard
										key={ index }
										status={ transaction.transaction_status }
										need_currency={ transaction.Inquiries[0].need_currency }
										have_currency={ transaction.Inquiries[0].have_currency }
										will_get={ transaction.Inquiries[0].need_amount }
										have_transfer={ transaction.Inquiries[0].have_amount }
										currencies={ this.state.currencies }										
									/>
								)
							})
						}
					</div>
				</Row>
			</div>
		)
	}
}

Transaction.propTypes = {
	loading: PropTypes.bool,
	inquiry: PropTypes.object,
	transactions: PropTypes.any,
	user: PropTypes.object,
	getTransactions: PropTypes.func,
	isInquiry: PropTypes.bool,
	isLiveTransaction: PropTypes.bool,
	liveTransaction: PropTypes.object
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.getLoading(),
	isInquiry: selectors.getIsInquiry(),
	inquiry: selectors.getInquiry(),
	isLiveTransaction: selectors.getIsLiveTransaction(),
	transactions: selectors.getTransactions(),
	liveTransaction: selectors.getLiveTransaction(),
	user: getUser(),
})

const mapDispatchToProps = (dispatch) => ({
	getTransactions: (id) => dispatch(actions.getTransactions(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)