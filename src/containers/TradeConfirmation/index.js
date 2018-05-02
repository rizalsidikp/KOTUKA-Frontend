import React, { Component } from 'react'
import { Collapse } from 'react-collapse'
import ReactTable from 'react-table'

import { myself, someone_else } from './../Recipient/column'

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

import Row from '../../components/Row'

import './style.scss'
import strings from '../../localizations'
import TradeCard from '../../components/TradeCard'
import LabelInput from '../../components/LabelInput'
import RadioButton from '../../components/RadioButton'
import ModalRecipient from '../../components/ModalRecipient'

class TradeConfirmation extends Component {
	constructor(props) {
		super(props)
		this.state={
			collapse : 1,
			checked: 'myself',
			modalRecipient: false
		}
	}
	render() {	
		const columns = this.state.checked === 'myself' ? myself : this.state.checked === 'someone' ? someone_else : null 
		return (
			<div className="container dashboard-container">
				<Row className="justify-content-center">
					<div className="col col-md-8">
						<label className="font14 text-secondary clickable full-width text-right">{ strings.cancel }</label>
						<Row>
							<div className="col col-md-auto trade-c-line-top">
								<div className={ this.state.collapse === 1 ? 'trade-c-circle-active' : 'trade-c-circle' } onClick={ () => this.setState({ collapse: 1 }) } />
							</div>
							<div className={ 'col trade-c-box '.concat(this.state.collapse === 1 ? 'background-secondary-light' : '') }>
								<Collapse isOpened={ true }>
									<div className={ 'font14 '.concat(this.state.collapse === 1 ? 'text-secondary font-weight-bold' : 'text-black-semi') }>{ strings.recipient }</div>
									{
										this.state.collapse === 1 &&
										<div>
											<Row className="trade-c-recipient-row align-items-center">
												<div className="col col-md-auto">
													<RadioButton name='type' checked={ this.state.checked === 'myself' } label='My Self' onChange={ () => this.setState({ checked: 'myself' }) } />
												</div>
												<div className="col">
													<RadioButton name='type' checked={ this.state.checked === 'someone' } label='Someone Else' onChange={ () => this.setState({ checked: 'someone' }) } />
												</div>
												<div className="col col-md-auto text-right">
													<button className="button-xs button-secondary ml-auto" onClick={ () => this.setState({ modalRecipient: true }) }> { strings.add } </button> 
												</div>
											</Row>
											<div className="trade-c-table">
												<ReactTable
													data={ data }
													columns={ columns }
													defaultPageSize={ 3	}
													showPageJump={ false }
												/>
											</div>
										</div>
									}
								</Collapse>
							</div>
						</Row>
						<Row>
							<div className="col col-md-auto trade-c-line">
								<div className={ this.state.collapse === 2 ? 'trade-c-circle-active' : 'trade-c-circle' } onClick={ () => this.setState({ collapse: 2 }) } />
							</div>
							<div className={ 'col trade-c-box '.concat(this.state.collapse === 2 ? 'background-secondary-light' : '') }>
								<Collapse isOpened={ true }>
									<div className={ 'font14 '.concat(this.state.collapse === 2 ? 'text-secondary font-weight-bold' : 'text-black-semi') }>{ strings.purpose }</div>
									{
										this.state.collapse === 2 &&
										<div>
											<LabelInput name='purpose' label={ strings.purpose } placeholder={ strings.purpose } value={ this.state.purpose } onChange={ (e) => this.setState({ purpose: e.target.value }) } />											
											<LabelInput name='other' label={ strings.other } placeholder={ strings.other } value={ this.state.other } onChange={ (e) => this.setState({ other: e.target.value }) } />											
										</div>
									}
								</Collapse>
							</div>
						</Row>
						<Row>
							<div className="col col-md-auto trade-c-line-bottom">
								<div className={ this.state.collapse === 3 ? 'trade-c-circle-active' : 'trade-c-circle' } onClick={ () => this.setState({ collapse: 3 }) } />
							</div>
							<div className={ 'col trade-c-box '.concat(this.state.collapse === 3 ? 'background-secondary-light' : '') }>
								<Collapse isOpened={ true }>
									<div className={ 'font14 '.concat(this.state.collapse === 3 ? 'text-secondary font-weight-bold' : 'text-black-semi') }>{ strings.review }</div>
									{
										this.state.collapse === 3 &&
										<Row>
											<TradeCard withoutSelect />
											<TradeCard withoutSelect />
											<div className="col col-md-6 font12 text-primary font-weight-bold">
												{ strings.will_get } &emsp; <span className="font16">£ 2,074.63</span>
											</div>
											<div className="col col-md-6 font12 text-primary font-weight-bold">
												{ strings.you_have_to_transfer } &emsp; <span className="font16">Rp 40,000,000</span>
											</div>
											{/* <div className="col col-12" >
												<table>
													<tbody>
														<tr>
															<td className="font16 text-secondary font-weight-bold"></td>
															<td className="font16 text-secondary font-weight-bold">:</td>
															<td></td>
														</tr>
													</tbody>
												</table>
											</div> */}
										</Row>
									}
								</Collapse>
							</div>
						</Row>
					</div>
				</Row>
				<ModalRecipient
					open={ this.state.modalRecipient }
					onClose={ () => this.setState({ modalRecipient: false }) }
				/>
			</div>
		)
	}
}

export default TradeConfirmation