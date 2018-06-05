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

import { getAlert } from '../Alert/selectors'
import { setAlertStatus } from '../Alert/actions'

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
		this.props.getStatuses()
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
							// this.props.isInquiry &&
							// <TransactionCard 
							// 	status={ this.props.inquiry.get('status') }
							// 	need_currency={ this.props.inquiry.get('need_currency') }
							// 	have_currency={ this.props.inquiry.get('have_currency') }
							// 	will_get={ this.props.inquiry.get('need_amount') }
							// 	have_transfer={ this.props.inquiry.get('total_amount_transfer') }
							// 	currencies={ this.state.currencies }
							// 	deadline_post={ this.props.inquiry.get('deadline_post') }
							// 	id={ this.props.inquiry.get('id') }
							// 	isInquiry
							// 	statuses={ this.props.statuses }
							// />
						}
						{
							this.props.inquiries && this.props.inquiries.length > 0 &&
							this.props.inquiries.map((inquiry, index) => {
								return(
									<TransactionCard
										key={ index }
										status={ inquiry.status }
										need_currency={ inquiry.need_currency }
										have_currency={ inquiry.have_currency }
										will_get={ inquiry.need_amount }
										have_transfer={ inquiry.total_amount_transfer }
										currencies={ this.state.currencies }		
										deadline_post={ inquiry.deadline_post }										
										id={ inquiry.id	}
										status_poster={ inquiry.status_poster }
										statuses={ this.props.statuses }																							
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
	inquiries: PropTypes.any,
	statuses: PropTypes.any,
	user: PropTypes.object,
	getTransactions: PropTypes.func,
	isInquiry: PropTypes.bool,
	alert: PropTypes.bool,
	setAlertStatus: PropTypes.func,
	getStatuses: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.getLoading(),
	isInquiry: selectors.getIsInquiry(),
	inquiries: selectors.getInquiries(),
	user: getUser(),
	alert: getAlert(),
	statuses: selectors.getStatuses()
})

const mapDispatchToProps = (dispatch) => ({
	getTransactions: (id) => dispatch(actions.getTransactions(id)),
	setAlertStatus: (alert) => dispatch(setAlertStatus(alert)),
	getStatuses: () => dispatch(actions.getStatuses()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)