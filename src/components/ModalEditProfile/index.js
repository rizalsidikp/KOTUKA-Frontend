import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Modal from '../Modal'
import LabelInput from './../LabelInput'


import './style.scss'
import strings from '../../localizations'
import Row from '../Row'
import { chunkArray } from '../../services/helper'
import Select from 'react-select-plus/lib/Select'
import TitleWithHr from '../TitleWithHr'


class ModalEditProfile extends Component {

	constructor(props) {
		super(props)
		this.state = {
			imagePreviewUrl: '',
			photo: null,
			first_and_middle_name: '',
			last_name: '',
			birthdate: moment(),
			phone_code: '+62',
			phone: '',
			origin_country: 'Indonesia',
			post_code: '',
			address: ''
		}
	}

	componentWillMount() {
		this.setForm()
	}

	onSelectCountry = (val) => {
		this.setState({ origin_country: val.value })
	}

	onSelectPhoneCode = (val) => {
		this.setState({ phone_code: val.value })
	}

	onClose = () => {
		this.props.onClose()
		this.setForm()
	}


	setForm = () => {
		const { user } = this.props
		this.setState({ 
			imagePreviewUrl: user.get('avatar'),
			first_and_middle_name: user.get('first_and_middle_name'),
			last_name: user.get('last_name'),
			birthdate: user.get('birthday') ? moment(user.get('birthday')) : moment(),
			phone_code: user.get('phone_code'),
			phone: user.get('phone'),
			origin_country: user.get('address').get('origin_country'),
			post_code: user.get('address').get('post_code'),
			address: user.get('address').get('address')
		})
	}

	onUpdateUser = () => {
		const {
			first_and_middle_name,
			last_name,
			birthdate,
			phone_code,
			phone,
			origin_country,
			post_code,
			address,
		} = this.state
		let addressJ = {
			origin_country,
			post_code,
			address,
		}
		addressJ = JSON.stringify(addressJ)
		const payload = {
			first_and_middle_name,
			last_name,
			birthday: moment(birthdate).format('YYYY-MM-DD'),
			phone_code,
			phone,
			address: addressJ
		}
		this.props.updateUser(payload, this.props.user.get('id'))
	}

	renderItem = (props) => {
		return(
			<div className="Select-value">
				<img className="select-logo" src={ props.image } />
				<span className="Select-value-label">{ props.value }</span>
			</div>
		)
	}
	render() {
		const options = chunkArray(this.props.countries, 'name', 'name', 'flag')		
		const optionsNum = chunkArray(this.props.countries, 'callingCodes', 'callingCodes', 'flag', true)
		return (
			<Modal open={ this.props.open } onClose={ this.onClose } contentStyle="mep-wrapper" >
				<div className="mic-content">			
					<h2 className="font24 text-center text-black-semi font-weight-bold">
						{ strings.edit_profile }
					</h2>
					<hr />
					<div className="mep-photo-profile mx-auto clickable" style={{ backgroundImage: `url('${ this.props.profileUrl }')` }} onClick={ this.props.onImgClick } />
					<Row>
						<div className="col col-md-6">
							<LabelInput disabled name="firstname" label={ strings.first_n_midle_name } value={ this.state.first_and_middle_name } onChange={ (e) => this.setState({ first_and_middle_name: e.target.value }) } />
							<LabelInput disabled type='date' name='birthdate' label={ strings.birthdate } placeholder={ strings.birthdate } value={ this.state.birthdate } onChange={ (birthdate) => this.setState({ birthdate })  } />										
						</div>
						<div className="col col-md-6">
							<LabelInput disabled name='last_name' label={ strings.last_name } placeholder={ strings.last_name } value={ this.state.last_name } onChange={ (e) => this.setState({ last_name : e.target.value }) } /> 
							<label className="font16 text-black-semi full-width no-margin font-weight-semi-bold">{ strings.phone }</label>						
							<Row>
								<div className="col col-md-auto no-right-padding">
									<Select
										className="li-input-select mep-num"
										name="form-field-name"
										value={ this.state.phone_code }
										clearable={ false }
										onChange={ this.onSelectPhoneCode }
										autosize={ false }
										options={ optionsNum }
										valueRenderer={ (props) => this.renderItem(props) }
									/>
								</div>
								<div className="col">
									<LabelInput noLabel name='phone' label={ strings.phone } placeholder={ strings.phone } value={ this.state.phone } onChange={ (e) => this.setState({ phone : e.target.value }) } /> 																				
								</div>
							</Row>
						</div>
						<div className="col col-md-12">
							<TitleWithHr
								className="font24"
								title={ strings.address }
							/>
						</div>
						<div className="col col-md-6">
							<label className="font16 text-black-semi full-width no-margin font-weight-semi-bold">{ strings.country }</label>						
							<Select
								className="li-input-select"
								name="form-field-name"
								value={ this.state.origin_country }
								clearable={ false }
								onChange={ this.onSelectCountry }
								autosize={ false }
								options={ options }
								valueRenderer={ (props) => this.renderItem(props) }
							/>
							<LabelInput name="postalCode" label={ strings.postalCode } placeholder={ strings.postalCode } value={ this.state.post_code } onChange={ (e) => this.setState({ post_code: e.target.value }) } />					
						</div>
						<div className="col col-md-6">
							<LabelInput type='textarea' name='address' label={ strings.address } placeholder={ strings.address } value={ this.state.address } onChange={ (e) => this.setState({ address : e.target.value }) } />																
						</div>
						<div className="col col-md-12 d-flex justify-content-end">
							<button className="button button-secondary-white" disabled={ this.props.loading } >{ strings.cancel }</button>
							<button className="button button-primary mep-btn" onClick={ this.onUpdateUser } disabled={ this.props.loading }>{ strings.save }</button>
						</div>				
					</Row>						
				</div>
			</Modal>
		)
	}
}

ModalEditProfile.propTypes = {
	open: PropTypes.bool,
	loading: PropTypes.bool,
	onClose: PropTypes.func,
	onButtonClick: PropTypes.func,
	updateUser: PropTypes.func,
	onImgClick: PropTypes.func,
	profileUrl: PropTypes.string,
	countries: PropTypes.any,
	user: PropTypes.object
}

export default ModalEditProfile