import React, { Component } from 'react'
import Row from '../../components/Row'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from './../Profile/selectors'
import * as actions from './../Profile/actions'
import { getUser } from '../Header/selectors'
import moment from 'moment'

import './style.scss'

// import { Logo } from './../../images'
import strings from '../../localizations'
import CopyRight from '../../components/CopyRight'
import LabelInput from '../../components/LabelInput'
import HeaderDashboard from './../HeaderDashboard'
import { statusHtmlStorage, chunkArray } from '../../services/helper'
import TitleWithHr from '../../components/TitleWithHr'
import Select from 'react-select-plus/lib/Select'

class SecondRegistration extends Component {
	constructor(props){
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
		this.getData()
	}
	getData = async() => {
		await this.props.getCountries()
		await this.props.getUser(this.props.user.get('id'))
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
	handleImageChange = (e) => {
		e.preventDefault()
		let reader = new FileReader()
		let photo = e.target.files[0]
		reader.onloadend = () => {
			this.setState({
				photo: photo,
				imagePreviewUrl: reader.result
			})
		}
		reader.readAsDataURL(photo)
	}
	renderItem = (props) => {
		return(
			<div className="Select-value">
				<img className="select-logo" src={ props.image } />
				<span className="Select-value-label">{ props.value }</span>
			</div>
		)
	}
	onSelectCountry = (val) => {
		this.setState({ origin_country: val.value })
	}

	onSelectPhoneCode = (val) => {
		this.setState({ phone_code: val.value })
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

	render() {
		if(!statusHtmlStorage('accessToken')){
			return(<Redirect to="/" />)			
		}
		if(!localStorage.getItem('secondRegistration')){
			return(<Redirect to="/dashboard/post" />)			
		}
		const {
			imagePreviewUrl ,
			first_and_middle_name,
			last_name,
			birthdate,
			phone_code,
			phone,
			origin_country,
			post_code,
			address,
		} = this.state
		const options = chunkArray(this.props.countries, 'name', 'name', 'flag')		
		const optionsNum = chunkArray(this.props.countries, 'callingCodes', 'callingCodes', 'flag', true)
		return (
			<div>
				<div className="container sr-container">
					<Row>
						<HeaderDashboard
							activePage={ this.props.location.pathname.split('/')[2] }
							location={ this.props.location }
						/>
						<div className="col col-md-8 sr-card mx-auto">
							<div className="background-secondary sr-title">
								<h1 className="font24 text-white font-weight-bold">{ strings.before_we_move }, { strings.lets_complete_your_profile }</h1>
							</div>
							<div className="sr-form">
								<div className="sr-photo-profile mx-auto clickable" onClick={ () => this.upload.click() } style={{ backgroundImage: `url('${ imagePreviewUrl }')` }} />
								<div className="d-flex">
									<label className="mx-auto font16 text-primary font-weight-semi-bold clickable" onClick={ () => this.upload.click() } >{ strings.upload }</label>
								</div>
								<Row>
									<div className="col col-md-6">
										<LabelInput name='first_midle_name' label={ strings.first_n_midle_name } placeholder={ strings.first_n_midle_name } value={ first_and_middle_name } onChange={ (e) => this.setState({ first_and_middle_name : e.target.value }) } /> 
										<LabelInput type='date' name='birthdate' label={ strings.birthdate } placeholder={ strings.birthdate } value={ birthdate } onChange={ (birthdate) => this.setState({ birthdate })  } />										
									</div>
									<div className="col col-md-6">
										<LabelInput name='last_name' label={ strings.last_name } placeholder={ strings.last_name } value={ last_name } onChange={ (e) => this.setState({ last_name : e.target.value }) } /> 
										<label className="font16 text-black-semi full-width no-margin font-weight-semi-bold">{ strings.phone }</label>						
										<Row>
											<div className="col col-md-auto no-right-padding">
												<Select
													className="li-input-select sr-num"
													name="form-field-name"
													value={ phone_code }
													clearable={ false }
													onChange={ this.onSelectPhoneCode }
													autosize={ false }
													options={ optionsNum }
													valueRenderer={ (props) => this.renderItem(props) }
												/>
											</div>
											<div className="col">
												<LabelInput noLabel name='phone' label={ strings.phone } placeholder={ strings.phone } value={ phone } onChange={ (e) => this.setState({ phone : e.target.value }) } /> 											
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
											value={ origin_country }
											clearable={ false }
											onChange={ this.onSelectCountry }
											autosize={ false }
											options={ options }
											valueRenderer={ (props) => this.renderItem(props) }
										/>
										<LabelInput name="postalCode" label={ strings.postalCode } placeholder={ strings.postalCode } value={ post_code } onChange={ (e) => this.setState({ post_code: e.target.value }) } />							
									</div>
									<div className="col col-md-6">
										<LabelInput type='textarea' name='address' label={ strings.address } placeholder={ strings.address } value={ address } onChange={ (e) => this.setState({ address : e.target.value }) } />										
									</div>
									<div className="col col-md-6">
									</div>
									<div className="col col-md-16">
										<button className="button button-primary full-width" onClick={ this.onUpdateUser }>{ strings.complete_my_profile }</button>
									</div>				
								</Row>
							</div>
						</div>
					</Row>
				</div>
				<CopyRight />
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

SecondRegistration.propTypes = {
	location: PropTypes.object,
	loading: PropTypes.bool,
	countries: PropTypes.any,
	user: PropTypes.object,
	getUser: PropTypes.func,
	getCountries: PropTypes.func,
	updateUser: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.getLoading(),
	countries: selectors.getCountries(),
	user: getUser(),
})

const mapDispatchToProps = (dispatch) => ({
	getUser: (id) => dispatch(actions.getUser(id)),
	getCountries: () => dispatch(actions.getCountries()),
	updateUser: (payload, id) => dispatch(actions.updateProfile(payload, id))
})

export default connect (mapStateToProps, mapDispatchToProps) (SecondRegistration)