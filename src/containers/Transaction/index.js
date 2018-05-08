import React, { Component } from 'react'

import './style.scss'
import Row from '../../components/Row'
import TransactionCard from '../../components/TransactionCard'
import firebaseService from './../../services/firebase'

class Transaction extends Component {
	componentWillMount(){
		firebaseService.getLiveTransaction()
	}
	render() {
		return (
			<div className="container dashboard-container">
				<Row className="justify-content-center">
					<div className="col col-md-8">
						<TransactionCard 
							status="Waiting for trader to transfer"
						/>
					</div>
				</Row>
			</div>
		)
	}
}

export default Transaction