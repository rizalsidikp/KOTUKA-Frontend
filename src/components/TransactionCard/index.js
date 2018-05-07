import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import Row from '../Row'
import strings from '../../localizations'
import { LogoCircle } from './../../images'
import InquiryBox from '../InquiryBox'

class TransactionCard extends Component {
	render() {
		return (
			<Row className='tran-c-row'>
				<div className='col col-md-auto'>
					<div className="d-flex tran-r-row-flag">
						<img src={ LogoCircle } className="tran-c-img" /><span className="font20 text-secondary font-weight-bold">GBP</span>
						<i className="right tran-c-arrow" />
						<img src={ LogoCircle } className="tran-c-img" /><span className="font20 text-secondary font-weight-bold">IDR</span>
					</div>
					<div className="font12 text-gray">{ strings.transaction_status }</div>
					<span className='font16 text-black-semi font-weight-semi-bold'>{ this.props.status }</span>
					<InquiryBox 
						you
						status="waiting"
					/>
					<InquiryBox 
						status="completed"
						name="Chelsea London"
					/>
					<InquiryBox 
						status="waiting"
						name="Thompson"
					/>
				</div>
				<div className='col d-flex flex-column align-items-end'>
					<span className="font12 text-secondary font-weight-bold">{ strings.will_get }</span>
					<span className="font24 text-primary font-weight-bold tran-c-line-16">£ 2,074.63</span>
					<br />
					<span className="font12 text-secondary font-weight-bold tran-c-line-1">{ strings.you_have_to_transfer }</span>
					<span className="font24 text-primary font-weight-bold">Rp 40,000,000</span>
				</div>
			</Row>
		)
	}
}

TransactionCard.propTypes = {
	status: PropTypes.string
}

export default TransactionCard