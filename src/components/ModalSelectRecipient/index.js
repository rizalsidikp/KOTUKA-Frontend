import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'

import './style.scss'
import strings from '../../localizations'
import SelectRecipientCard from '../SelectRecipientCard'
import LabelInput from '../LabelInput'
import Row from '../Row'
import { Collapse } from 'react-collapse'


class ModalSelectRecipient extends Component {
	constructor(props){
		super(props)
		this.state={
			email_address: '',
			question: '',
			add_account: false,
		}
	}
	render() {
		return (
			<Modal open={ this.props.open } onClose={ this.props.onClose } contentStyle=" msr-wrapper " >
				<div className="msr-content">			
					<h2 className="font24 text-center text-black-semi font-weight-bold">
						{ strings.select_bank_account + ' ' }
						<span className="text-primary">({ 'IDR' })</span>
					</h2>
					<hr />
					{
						this.props.recipients && this.props.recipients.length > 0 ?
							this.props.recipients.map((recipient, index) => {
								return(
									<SelectRecipientCard
										key={ index }
										data={ recipient }
										onClick={ () => this.props.onSelectedRecipient(recipient) }
									/>
								)
							})
							:
							null
					}
					<div className="msr-add-account text-center">
						<Collapse isOpened={ true }>					
							{
								this.state.add_account ? 
									<Row className="no-margin">
										<div className="col col-md-9 text-left">
											<LabelInput
												labelClassName="text-black-semi"
												name="first_and_middle_name" 
												placeholder={ strings.first_n_midle_name } 
												label={ strings.first_n_midle_name } 
												value={ this.state.first_n_midle_name } 
												onChange={ (e) => this.setState({ first_n_midle_name: e.target.value }) }
											/>
											<LabelInput
												labelClassName="text-black-semi" 
												name="last_name" 
												placeholder={ strings.last_name } 
												label={ strings.last_name } 
												value={ this.state.last_name } 
												onChange={ (e) => this.setState({ last_name: e.target.value }) }
											/>
											<LabelInput
												labelClassName="text-black-semi" 
												name="account_no" 
												placeholder={ strings.account_no } 
												label={ strings.account_no } 
												value={ this.state.account_no } 
												onChange={ (e) => this.setState({ account_no: e.target.value }) }
											/>
											<LabelInput
												labelClassName="text-black-semi" 
												name="description" 
												placeholder={ strings.description } 
												label={ strings.description } 
												value={ this.state.description } 
												onChange={ (e) => this.setState({ description: e.target.value }) }
											/>
										</div>
										<div className="col col-md-3">
											<button className="button-sm button-primary full-width">{ strings.save }</button>
											<button className="button-sm button-secondary-white full-width" onClick={ () => this.setState({ add_account: false }) }>{ strings.cancel }</button>
										</div>
									</Row>
									:
									<button className="button-sm button-secondary-white" onClick={ () => this.setState({ add_account: true }) }>{ strings.add_account }</button>
							}
						</Collapse>
					</div>
				</div>
			</Modal>
		)
	}
}

ModalSelectRecipient.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	onSelectedRecipient: PropTypes.func,
	recipients: PropTypes.any
}

export default ModalSelectRecipient