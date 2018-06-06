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
import LabelInput from '../../components/LabelInput'
import HeaderDashboard from './../HeaderDashboard'
import { statusHtmlStorage, chunkArray, validateNumber, validateLength, validateName } from '../../services/helper'
import TitleWithHr from '../../components/TitleWithHr'
import Select from 'react-select-plus/lib/Select'
import CopyRight from '../CopyRight'
import { Profile, Camera } from './../../images'

class SecondRegistration extends Component {
	constructor(props){
		super(props)
		this.state = {
			imagePreviewUrl: '',
			photo: null,
			first_and_middle_name: '',
			last_name: '',
			birthdate: moment(),
			phone_code: '',
			phone: '',
			origin_country: '',
			post_code: '',
			address: '',
			photoFile: true,
			photoSize: true,
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
		const type = photo.type.split('/')[0]
		this.setState({ photoFile : type === 'image', photoSize: photo.size <= 2097152 })
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
		this.setState({ origin_country: val.value, origin_country_invalid: false })
	}

	onSelectPhoneCode = (val) => {
		this.setState({ phone_code: val.value, phone_code_invalid: false })
	}

	handleChange = (e) => {
		this.setState({ [e.target.name] : e.target.value })
	}

	handleBirthDate = (birthdate) => {
		this.setState({ birthdate })
	}

	onUpdateUser = async () => {
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
			first_and_middle_name : first_and_middle_name .trim(),
			last_name : last_name.trim(),
			birthday: moment(birthdate).format('YYYY-MM-DD'),
			phone_code,
			phone : phone.trim(),
			address: addressJ.trim()
		}
		let photoPayload = null
		if(this.state.photo){
			photoPayload = {
				avatar: this.state.photo,
				id: this.props.user.get('id')
			}
		}
		this.props.updateUser(payload, this.props.user.get('id'), photoPayload)
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

		const vName = validateName(first_and_middle_name)
		const vPhone = validateNumber(phone)
		const vPostCode = validateLength(post_code)
		const vAddress = validateLength(address, 5)

		const valid = vName && first_and_middle_name && phone_code && vPhone && origin_country && vPostCode && vAddress && this.state.photoFile && this.state.photoSize
		
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
								<div className="sr-photo-profile mx-auto clickable" onClick={ () => this.upload.click() } style={{ backgroundImage: `url('${ imagePreviewUrl || Profile }')` }} >
									<div className="profile-camera">
										<img src={ Camera } />
									</div>
								</div>
								{
									!this.state.photoFile && !!this.state.photo &&
									<label className="font14 full-width text-center text-red font-weight-semi-bold">{ strings.file_not_image }</label>					
								}
								{
									!this.state.photoSize && !!this.state.photo &&
									<label className="font14 full-width text-center text-red font-weight-semi-bold">{ strings.file_to_large } 2MB</label>					
								}
								<Row>
									<div className="col col-md-6">
										<LabelInput invalid={ !vName && first_and_middle_name !== '' } invalidMessage={ strings.wrong_name } name='first_and_middle_name' label={ strings.first_n_midle_name } placeholder={ strings.first_n_midle_name } value={ first_and_middle_name } onChange={ this.handleChange } /> 
									</div>
									<div className="col col-md-6">
										<LabelInput name='last_name' label={ strings.last_name } placeholder={ strings.last_name } value={ last_name } onChange={ this.handleChange } /> 
									</div>

									<div className="col col-md-6">
										<LabelInput type='date' name='birthdate' label={ strings.birthdate } placeholder={ strings.birthdate } value={ birthdate } onChange={ this.handleBirthDate  } />										
									</div>


									<div className="col col-md-6">
										<label className="font16 text-black-semi full-width no-margin font-weight-semi-bold">{ strings.phone }</label>						
										<Row>
											<div className="col col-md-auto no-right-padding">
												<Select
													className={ 'li-input-select sr-num '.concat(!vPhone ? 'sr-no-margin' : '') }
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
												<LabelInput invalid={ !vPhone && phone !== '' } noLabel name='phone' label={ strings.phone } placeholder={ strings.phone } value={ phone } onChange={ this.handleChange } /> 											
											</div>
										</Row>
										{
											!vPhone ?
												<label className="font14 text-red font-weight-semi-bold li-invalid">{ strings.wrong_phone }</label>			
												:null								
										}
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
											className={ 'li-input-select ' }
											name="form-field-name"
											value={ origin_country }
											clearable={ false }
											onChange={ this.onSelectCountry }
											autosize={ false }
											options={ options }
											valueRenderer={ (props) => this.renderItem(props) }
										/>
										<LabelInput invalid={ !vPostCode && post_code !== '' } invalidMessage={ strings.wrong_postal_code } name="post_code" label={ strings.postalCode } placeholder={ strings.postalCode } value={ post_code } onChange={ this.handleChange } />							
									</div>
									<div className="col col-md-6">
										<LabelInput invalid={ !vAddress && address !== '' } invalidMessage={ strings.wrong_address }  type='textarea' name='address' label={ strings.address } placeholder={ strings.address } value={ address } onChange={ this.handleChange } />										
									</div>
									<div className="col col-md-6">
									</div>
									<div className="col col-md-16">
										<button disabled={ this.props.loading || !valid } className="button button-primary full-width" onClick={ this.onUpdateUser }>{ strings.complete_my_profile }</button>
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
	updateUser: (payload, id, photoPayload) => dispatch(actions.updateProfile(payload, id, photoPayload))
})

export default connect (mapStateToProps, mapDispatchToProps) (SecondRegistration)