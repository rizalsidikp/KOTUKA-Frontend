import React, { Component } from 'react'
import Row from '../../components/Row'
import ModalRecipient from '../../components/ModalRecipient'
import strings from '../../localizations'
import ReactTable from 'react-table'

import './style.scss'

import { myself, someone_else } from './column'

const data = [
	{
		first_middle_name: 'Rizal',
		last_name: 'Sidik',
		country: 'ID',
		bank_account: '123456'
	},
	{
		first_middle_name: 'Rizal',
		last_name: 'Sidik',
		country: 'UK',
		bank_account: '123456',
		sort_code: '123 abc'		
	}
]

class Recipient extends Component {
	constructor(props) {
		super(props)
		this.state={
			modalRecipient: false
		}
	}
	
	render() {
		return (
			<Row className="justify-content-center dashboard-container">
				<div className="col col-md-8">
					<div className="text-right">
						<button className="button button-blue button-rounded button-shadow text-white font-weight-bold text-capitalize" onClick={ () => this.setState({ modalRecipient: true }) }>+ { strings.add }</button>
					</div>
					<h2 className="font20 text-blue font-weight-semi-bold rec-h2">My Self</h2>
					<ReactTable
						data={ data }
						columns={ myself }
						defaultPageSize={ 5	}
						showPageJump={ false }
						style={{ marginBottom: 20, }}
					/>
					<h2 className="font20 text-blue font-weight-semi-bold rec-h2">Someone Else</h2>
					<ReactTable
						data={ data }
						columns={ someone_else }
						defaultPageSize={ 5	}
						showPageJump={ false }
					/>
				</div>
				<ModalRecipient
					open={ this.state.modalRecipient }
					onClose={ () => this.setState({ modalRecipient: false }) }
				/>
			</Row>
		)
	}
}

export default Recipient