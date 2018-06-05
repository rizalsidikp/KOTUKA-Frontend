import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from './selectors'
import * as actions from './actions'
import history from './../../history'

import Row from '../../components/Row'
import ModalRecipient from '../../components/ModalRecipient'
import currenciesService from './../../services/currencies'

import strings from '../../localizations'

import './style.scss'


import { getUser } from '../Header/selectors'
import { mySelfRecipientList, someoneElseRecipientList } from '../../services/helper'
import RecipientCard from '../../components/RecipientCard'
import ModalDialog from '../../components/ModalDialog'

class Recipient extends Component {
	constructor(props) {
		super(props)
		this.state={
			modalRecipient: false,
			modalDialog: false,
			currencies: [],
			selectedId: 0
		}
	}

	componentWillMount() {
		this.getCurrencies()
		if(this.props.match.params.type !== 'myself' && this.props.match.params.type !== 'someoneelse'){
			history.push('/dashboard/recipient/myself')
		}
		this.props.getRecipients(this.props.user.get('id'))
	}

	addAccount = async (payload) => {
		payload = {
			id_user: this.props.user.get('id'),
			...payload
		}
		await this.props.addRecipient(payload)
		this.setState({ modalRecipient: false })
	}

	deleteAccount = (id) => {
		this.props.deleteRecipient(id, this.props.user.get('id'))
	}

	getCurrencies = async() => {
		const response = await currenciesService.getCurrencies()
		if(response.result){
			const currencies = response.result
			this.setState({ currencies })
		}
	}

	onDeleteRecipient = async() => {
		await this.props.deleteRecipient(this.state.selectedId, this.props.user.get('id'))
		this.setState({ modalDialog: false })
	}
	
	render() {
		const myselfList = mySelfRecipientList(this.props.recipients)
		const someoneList = someoneElseRecipientList(this.props.recipients)
		return (
			<Row className="justify-content-center dashboard-container">
				<div className="col col-md-7"> 
					{
						this.props.match.params.type === 'myself' &&
						myselfList.map((recipient, index) => {
							return(
								<RecipientCard
									key={ index }
									data={ recipient }
									currencies={ this.state.currencies }
									onDelete={ (selectedId) => this.setState({ selectedId, modalDialog: true }) }							
								/>
							)
						})
					}
					{
						this.props.match.params.type === 'someoneelse' &&
						someoneList.map((recipient, index) => {
							return(
								<RecipientCard
									key={ index }
									data={ recipient }
									currencies={ this.state.currencies }							
									onDelete={ (selectedId) => this.setState({ selectedId, modalDialog: true }) }																
								/>
							)
						})
					}
					<Row>
						<div className="text-center recipient-add-column col col-md-11">
							<button className="button button-secondary-white" onClick={ () => this.setState({ modalRecipient: true }) }>+ { strings.add_account }</button>
						</div>
					</Row>
				</div>
				<ModalRecipient
					open={ this.state.modalRecipient }
					onClose={ () => this.setState({ modalRecipient: false }) }
					first_and_middle_name={ this.props.user.get('first_and_middle_name') }
					last_name={ this.props.user.get('last_name') }
					addAccount={ (payload) => this.addAccount(payload) }
					loading={ this.props.loading }
					currencies={ this.state.currencies }
					myself={ this.props.match.params.type === 'myself' }
				/>
				<ModalDialog
					open={ this.state.modalDialog }
					header={ strings.wait }
					text={ strings.delete_recipient }
					onClose={ () => this.setState({ modalDialog: false, selectedId: 0 }) }
					onNoClick={ () => this.setState({ modalDialog: false, selectedId: 0 }) }
					onYesClick={ this.onDeleteRecipient }
					loading={ this.props.loading }
				/>
			</Row>
		)
	}
}

Recipient.propTypes = {
	loading: PropTypes.bool,
	recipients: PropTypes.any,
	user: PropTypes.object,
	match: PropTypes.object,
	//function
	setInitialState: PropTypes.func,
	getRecipients: PropTypes.func,
	addRecipient: PropTypes.func,
	deleteRecipient: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.getLoading(),
	recipients: selectors.getRecipients(),
	user: getUser()
})

const mapDispatchToProps = (dispatch) => ({
	setInitialState: () => dispatch(actions.setInitialState()),
	getRecipients: (id) => dispatch(actions.getRecipients(id)),
	addRecipient: (payload) => dispatch(actions.addReipient(payload)),
	deleteRecipient: (id, id_user) => dispatch(actions.deleteRecipient(id, id_user))
})

export default connect (mapStateToProps, mapDispatchToProps)(Recipient)