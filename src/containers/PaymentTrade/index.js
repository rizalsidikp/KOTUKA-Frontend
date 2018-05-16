import React, { Component } from 'react'
import Row from '../../components/Row'
import strings from '../../localizations'
import TitleWithHr from '../../components/TitleWithHr'
import LabelValue from '../../components/LabelValue'
import ModalIdCard from '../../components/ModalIdCard'

class PaymentTrade extends Component {
	constructor(props){
		super(props)
		this.state = {
			modalUploadIdCard: true,
			imagePreviewUrl: '',
			file: null
		}
	}
	handleImageChange = (e) => {
		e.preventDefault()
		let reader = new FileReader()
		let file = e.target.files[0]
		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewUrl: reader.result
			})
		}
		reader.readAsDataURL(file)
	}
	onSendMoney = () => {
		this.setState({ modalUploadIdCard: true })
	}
	render() {
		return (
			<div className="container dashboard-container">
				<Row className="justify-content-center">
					<div className="col col-md-6 card">
						<h1 className="text-center font24 font-weight-bold text-black-semi no-margin">{ strings.transfer_mehtod }</h1>
						<hr />
						{/* {transfer detail} */}
						<TitleWithHr
							title={ strings.transfer_detail }
						/>
						<table className="p_line full-width">
							<tbody>
								{/* {amount to convert} */}
								<tr>
									<td className="tc-td font14 text-black-semi">{ strings.amount_to_convert } <br /> 
										<span className="font12 text-gray">
											{ strings.guaranted_rate + ' '  }
											{/* { this.props.chooseHave.get('currency_symbol') + ' 1 = ' }
											{ this.props.chooseNeed.get('currency_symbol') + ' ' }
											{this.props.loading ? '...' : accounting.formatMoney(this.props.rate, '', this.props.chooseHave.get('currency_alias') === 'IDR' ? 7 : 2)} */}
										</span>
									</td>
									<td className="tc-td font16 text-primary text-right">
										{/* { this.props.chooseHave.get('currency_symbol') + ' ' }
										{ this.props.amountHave } */}
										Rp 18,891,309
									</td>
								</tr>
								{/* {kotuka fee} */}
								<tr>
									<td className="tc-td font14 text-black-semi">{ strings.kotuka_fee } <br /> 
										<span className="font12 text-gray">
											({ strings.fee_percent + ' '  }
											{/* { currency_symbol + ' ' }
											{ fixed_cost } */}
											)
										</span>
									</td>
									<td className="tc-td font16 text-primary text-right">
										{/* { this.props.chooseHave.get('currency_symbol') + ' ' }
										{ this.props.loading ? '...' : formatMoney(cost, this.props.chooseHave.get('currency_alias')) } */}
										Rp 114,456
									</td>
								</tr>
								{/* { have to transfer } */}
								<tr>
									<td className="tc-td font14 text-black-semi font-weight-bold">{ strings.you_have_to_transfer }</td>
									<td className="tc-td font16 text-primary text-right font-weight-bold">
										{/* { this.props.chooseHave.get('currency_symbol') + ' ' }
										{ this.props.loading ? '...' : formatMoney(total_transfer, this.props.chooseHave.get('currency_alias')) }												 */}
										Rp 19,005,765
									</td>
								</tr>
								{/* { you will get } */}
								<tr>
									<td className="tc-td font14 text-black-semi font-weight-bold">{ strings.will_get }</td>
									<td className="tc-td font16 text-primary text-right font-weight-bold">
										{/* { this.props.chooseNeed.get('currency_symbol') + ' ' }
										{ this.props.amountNeed }												 */}
										£ 1,000
									</td>
								</tr>
							</tbody>
						</table>
						{/* {recipient detail} */}
						<TitleWithHr
							title={ strings.recipient_detail }
						/>
						<table className="p_line full-width">
							<tbody>
								{/* { name } */}
								<tr>
									<td className="tc-td font14 text-black-semi">{ 'name' }</td>
									<td className="tc-td font16 text-primary text-right">
										Ismail Abdus Shobar
									</td>
								</tr>
								{/* { bank name } */}
								<tr>
									<td className="tc-td font14 text-black-semi">{ 'Bank Name' }</td>
									<td className="tc-td font16 text-primary text-right">
											Bank Name
									</td>
								</tr>
								{/* { bank account } */}
								<tr>
									<td className="tc-td font14 text-black-semi">{ strings.account_no }</td>
									<td className="tc-td font16 text-primary text-right">
										72218210022
									</td>
								</tr>
							</tbody>
						</table>
						<TitleWithHr
							title={ strings.select_bank }
						/>
						<TitleWithHr
							title={ strings.kotuka_acc_detail }
						/>
						<Row>
							<div className="col col-md-6">
								<LabelValue
									label={ strings.to }
									value={ 'Kotuka' }
								/>
							</div>
							<div className="col col-md-6">
								<LabelValue
									label={ strings.account_no }
									value={ '1234567890' }
								/>
							</div>
							<div className="col col-md-6">
								<LabelValue
									label={ strings.account_no }
									value={ '1234567890' }
									valueClassName="font20 font-weight-bold"
								/>
							</div>
							<div className="col col-md-6">
								<LabelValue
									label={ strings.time_limit }
									value={ '1234567890' }
									valueClassName="font20 font-weight-bold text-orange"
								/>
							</div>
						</Row>
						<div className="font12 text-gray">{ strings.the_money } (Ismail Abdus Shobar)</div>
						<button className="button button-yellow" onClick={ this.onSendMoney }>{ strings.have_sent_money }</button>
						<button className="button button-secondary-white">{ strings.will_send_money_later }</button>
					</div>
				</Row>
				<ModalIdCard
					open={ this.state.modalUploadIdCard }
					onButtonClick = { () => this.upload.click() }
					imagePreviewUrl={ this.state.imagePreviewUrl }
					onClose={ () => this.setState({ modalUploadIdCard: false }) }
				/>
				<input 
					id="file"
					type="file"
					accept="image/*"
					ref={ (ref) => this.upload = ref }
					onChange={ (e) => this.handleImageChange(e) }
					className="d-none"
				/>
			</div>	
		)
	}
}

export default PaymentTrade