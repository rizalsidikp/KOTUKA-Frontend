import React, { Component } from 'react'
import './style.scss'

import Row from '../Row'
import strings from '../../localizations'

class TransactionCard extends Component {
	render() {
		return (
			<Row className='tran-c-row'>
				<div className='col col-md-auto align-self-end'>
					<span className='font16 text-black-semi font-weight-semi-bold'>Waiting for picker</span>
				</div>
				<div className='col d-flex flex-column align-items-end'>
					<span className="font12 text-blue font-weight-bold">{ strings.will_get }</span>
					<span className="font24 text-blue-dark font-weight-bold tran-c-line-16">£ 2,074.63</span>
					<br />
					<span className="font12 text-blue font-weight-bold tran-c-line-1">{ strings.you_have_to_transfer }</span>
					<span className="font24 text-blue-dark font-weight-bold">Rp 40,000,000</span>
				</div>
			</Row>
		)
	}
}

export default TransactionCard