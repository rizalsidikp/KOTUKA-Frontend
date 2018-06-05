import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Row from '../Row'
import { getFlagFromCurrency } from '../../services/helper'
import { Close } from '../../images'
import strings from '../../localizations'
import { Collapse } from 'react-collapse'

class RecipientCard extends Component {
	constructor(props){
		super(props)
		this.state = {
			collapse: false
		}
	}
	render() {
		const { data } = this.props
		return (
			<Row className="align-items-center">
				<div className="col col-md-11 card recipient-card d-flex clickable" onClick={ () => this.setState({ collapse : !this.state.collapse }) }>
					<Row>
						<div className="col col-md-6 font-weight-semi-bold font24 text-primary">
							{ data.first_and_middle_name + ' ' + data.last_name }
						</div>
						<div className="col col-md-6 font-weight-semi-bold font24 text-primary text-right">
							<img className="recipient-img" src={ getFlagFromCurrency(this.props.currencies, data.Recipient.Currency.currency_alias) } />
							{ data.Recipient.Currency.currency_alias }
						</div>
					</Row>
					<Collapse isOpened={ this.state.collapse }>
						<Row className="recipient-row-collapse">
							<div className="col col-md-6">
								<div className="font12 text-gray">Bank</div>
								<div className="font16 text-black-semi">{ data.Recipient.bank_name }</div>
							</div>
							<div className="col col-md-6">
								<Row>
									<div className="col col-md-6">
										<div className="font12 text-gray">{ strings.account_no }</div>
										<div className="font16 text-black-semi">{ data.Recipient.account_no }</div>
									</div>
									{
										data.Recipient.sort_code &&
										<div className="col col-md-6">
											<div className="font12 text-gray">{ strings.sort_code }</div>
											<div className="font16 text-black-semi">{ data.Recipient.sort_code }</div>
										</div>
									}
								</Row>
							</div>
						</Row>
					</Collapse>
				</div>
				<div className="col col-md-1">
					<button onClick={ () => this.props.onDelete(data.id) } className="button button-secondary recipient-close">
						<img className="recpient-img-close" src={ Close } />
					</button>
				</div>
			</Row>
		)
	}
}

RecipientCard.propTypes = {
	data: PropTypes.object,
	currencies: PropTypes.array,
	onDelete: PropTypes.func
}

export default RecipientCard