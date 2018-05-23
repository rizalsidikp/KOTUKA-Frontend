import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from './selectors'
import * as actions from './actions'


import Row from '../../components/Row'
import ModalRecipient from '../../components/ModalRecipient'
import strings from '../../localizations'
import ReactTable from 'react-table'

import './style.scss'


import { myself, someone_else } from './column'

import { getUser } from '../Header/selectors'
import { mySelfRecipientList, someoneElseRecipientList } from '../../services/helper'

class Recipient extends Component {
	constructor(props) {
		super(props)
		this.state={
			modalRecipient: false
		}
	}

	componentWillMount() {
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
	
	render() {
		let mySelf = myself, someoneElse = someone_else
		const myselfList = mySelfRecipientList(this.props.recipients)
		const someoneList = someoneElseRecipientList(this.props.recipients)
		return (
			<Row className="justify-content-center dashboard-container">
				<div className="col col-md-8">
					<div className="text-right">
						<button className="button button-secondary" onClick={ () => this.setState({ modalRecipient: true }) }>+ { strings.add }</button>
					</div>
					<h2 className="font20 text-secondary font-weight-semi-bold rec-h2">My Self</h2>
					<ReactTable
						data={ myselfList }
						columns={ mySelf }
						defaultPageSize={ 5	}
						showPageJump={ false }
						style={{ marginBottom: 20, }}
						getTdProps={ (state, rowInfo, column) => {
							return {
								onClick: (e, handleOriginal) => {
									if(column.Header === 'Option'){
										this.deleteAccount(rowInfo.original.id)
									}
									if (handleOriginal) {
										handleOriginal()
									}
								}
							}
						} }
					/>
					<h2 className="font20 text-secondary font-weight-semi-bold rec-h2">Someone Else</h2>
					<ReactTable
						data={ someoneList }
						columns={ someoneElse }
						defaultPageSize={ 5	}
						showPageJump={ false }
						getTdProps={ (state, rowInfo, column) => {
							return {
								onClick: (e, handleOriginal) => {
									if(column.Header === 'Option'){
										this.deleteAccount(rowInfo.original.id)
									}
									if (handleOriginal) {
										handleOriginal()
									}
								}
							}
						} }
					/>
				</div>
				<ModalRecipient
					open={ this.state.modalRecipient }
					onClose={ () => this.setState({ modalRecipient: false }) }
					first_and_middle_name={ this.props.user.get('first_and_middle_name') }
					last_name={ this.props.user.get('last_name') }
					addAccount={ (payload) => this.addAccount(payload) }
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