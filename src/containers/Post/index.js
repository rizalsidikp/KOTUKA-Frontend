import React, { Component } from 'react'

import './style.scss'
import FormInputMoney from '../../components/FormInputMoney'
import TradeBox from '../../components/TradeBox'
import Row from '../../components/Row'
import strings from '../../localizations'

class Post extends Component {
	render() {
		return (
			<div className="container dashboard-container post-container">
				<FormInputMoney theme='blue' />
				<Row>
					<label className="font20 text-blue-dark full-width text-center font-weight-bold">or</label>
					<button className='mx-auto button button-rounded button-shadow button-blue-dark font-weight-bold'>{ strings.create_post }</button>
				</Row>
				<TradeBox theme='blue' />
			</div>
		)
	}
}

export default Post