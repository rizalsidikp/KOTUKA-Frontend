import React, { Component } from 'react'

import './style.scss'
import FormInputMoney from './../../components/FormInputMoney'
import TradeBox from '../../components/TradeBox'
import Row from '../../components/Row'
import strings from '../../localizations'

class Post extends Component {
	render() {
		return (
			<div className="container dashboard-container post-container">
				<FormInputMoney theme='secondary' />
				<Row>
					<label className="font20 text-primary full-width text-center font-weight-bold">or</label>
					<button className='mx-auto button button-primary'>{ strings.create_post }</button>
				</Row>
				<TradeBox theme='secondary' />
			</div>
		)
	}
}

export default Post