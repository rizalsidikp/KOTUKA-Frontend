import React, { Component } from 'react'
import PropTypes from 'prop-types'
import accounting from 'accounting'
import './style.scss'

import Row from '../Row'
import strings from '../../localizations'
import InquiryBox from '../InquiryBox'
import getSymbolFromCurrency from 'currency-symbol-map'
import { getFlagFromCurrency, statusAlias } from '../../services/helper'

import history from './../../history'


class TransactionCard extends Component {
	render() {
		let will_get = 0, have_transfer = 0
		will_get = this.props.will_get
		if(this.props.need_currency === 'IDR'){
			will_get = Math.round(will_get)
			will_get = accounting.formatMoney(will_get,'', 0, ',')
		}else{
			will_get = Math.round(will_get * 100) / 100
			will_get = accounting.formatMoney(will_get,'', 2, ',')
		}
		have_transfer = this.props.have_transfer
		if(this.props.have_currency === 'IDR'){
			have_transfer = Math.round(have_transfer)
			have_transfer = accounting.formatMoney(have_transfer,'', 0, ',')
		}else{
			have_transfer = Math.round(have_transfer * 100) / 100
			have_transfer = accounting.formatMoney(have_transfer,'', 2, ',')
		}

		return (
			<Row className={ 'tran-c-row '.concat(this.props.status === 'DONE_SETTLEMENT' ? 'tran-c-row-completed' : this.props.status === 'PENDING_EXPIRED' ? 'tran-c-row-failed' : '') }>
				<div className='col col-md-auto'>
					<div className="d-flex tran-r-row-flag">
						<img src={ getFlagFromCurrency(this.props.currencies, this.props.need_currency) } className="tran-c-img" /><span className="font20 text-secondary font-weight-bold">{ this.props.need_currency }</span>
						<i className="right tran-c-arrow" />
						<img src={ getFlagFromCurrency(this.props.currencies, this.props.have_currency) } className="tran-c-img" /><span className="font20 text-secondary font-weight-bold">{ this.props.have_currency }</span>
					</div>
					<div className="font12 text-gray">{ strings.transaction_status }</div>
					<span className='font16 text-black-semi font-weight-semi-bold'>{
						this.props.status === 'SETTLEMENT' ?
							statusAlias(this.props.statuses, this.props.status_poster) 
							:
							statusAlias(this.props.statuses, this.props.status) 
					}</span>
					{
						this.props.status === 'PENDING' ? 
							<InquiryBox 
								status={ this.props.status }
								name={ '' }
								deadline={ this.props.deadline_post }
								isInquiry
								onClickPayNow={ () => {
									history.push({
										pathname: '/dashboard/paymenttrade',
										state: { payment: this.props.id }
									})
								}
								}
							/>
							:null
					}
					{/* {
						live ?
							this.props.inquiries.map((inquiry, index) => {
								return(
									<InquiryBox 
										key={ index }
										you={ inquiry.id_user === this.props.id_user }
										status={ inquiry.status }
										name={ inquiry.User.first_and_middle_name }
										deadline={ inquiry.deadline_post }
										onClickPayNow={ () => {
											history.push({
												pathname: '/dashboard/paymenttrade',
												state: { payment: inquiry.id }
											})
										}
										}
									/>
								)
							})
							:null
					} */}
				</div>
				<div className='col d-flex flex-column align-items-end'>
					<span className="font12 text-secondary font-weight-bold">{ strings.will_get }</span>
					<span className="font24 text-primary font-weight-bold tran-c-line-16">{ getSymbolFromCurrency(this.props.need_currency) } { will_get }</span>
					<br />
					<span className="font12 text-secondary font-weight-bold tran-c-line-1">{ strings.you_have_to_transfer }</span>
					<span className="font24 text-primary font-weight-bold">{ getSymbolFromCurrency(this.props.have_currency) } { have_transfer }</span>
				</div>
			</Row>
		)
	}
}

TransactionCard.propTypes = {
	status: PropTypes.string,
	status_poster: PropTypes.string,
	statuses: PropTypes.any,
	need_currency: PropTypes.string,
	have_currency: PropTypes.string,
	will_get: PropTypes.string,
	have_transfer: PropTypes.string,
	deadline_post: PropTypes.string,
	inquiries: PropTypes.array,
	currencies: PropTypes.array,
	live: PropTypes.bool,
	isInquiry: PropTypes.bool,
	id_user: PropTypes.number,
	id: PropTypes.number
}

export default TransactionCard