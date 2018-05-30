import React, { Component } from 'react'
import Row from '../../components/Row'
import moment from 'moment'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from './selectors'
import * as actions from './actions'
import PropTypes from 'prop-types'
import { getUser } from '../Header/selectors'
import './style.scss'
import strings from '../../localizations'
import TradeLevel from '../../components/TradeLevel'
import TitleWithHr from './../../components/TitleWithHr'
import ProfileTable from '../../components/ProfileTable'
import ModalChangePassword from '../../components/ModalChangePassword'
import ModalIdCard from '../../components/ModalIdCard'
import ModalEditProfile from '../../components/ModalEditProfile'

class Profile extends Component {
	constructor(props){
		super(props)
		this.state = {
			modalChangePassword: false,
			modalUploadIdCard: false,
			modalEditProfile: false,
			imagePreviewUrl: '',
			file: null,
			profileUrl: '',
			photo: null,
		}
	}
	componentWillMount() {
		this.props.getCountries()
		this.getUser()
	}
	
	getUser = async() => {
		await this.props.getUser(this.props.user.get('id'))
		this.setState({ profileUrl: this.props.user.get('avatar') })
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
	handleProfileChange = (e) => {
		e.preventDefault()
		let reader = new FileReader()
		let file = e.target.files[0]
		reader.onloadend = () => {
			this.setState({
				photo: file,
				profileUrl: reader.result
			})
		}
		reader.readAsDataURL(file)
	}
	updateProfile = async(payload, id) => {
		let photoPayload = null
		if(this.state.photo){
			photoPayload = {
				avatar: this.state.photo,
				id
			}
		}
		await this.props.updateUser(payload, id, photoPayload)
		this.setState({ modalEditProfile: false })
	}

	updatePassword = async(payload) => {
		payload = {
			...payload,
			id: this.props.user.get('id')
		}
		await this.props.updatePassword(payload)
		this.setState({ modalChangePassword: false })
	}
	render() {
		const { user } = this.props
		const firstName = user.get('first_and_middle_name')
		const lastName = user.get('last_name')
		const response = user.get('response')
		const basicInfo = [
			{
				key: strings.first_n_midle_name,
				value: firstName 
			},
			{
				key: strings.last_name,
				value: lastName
			},
			{
				key: strings.birthdate,
				value: moment(this.props.user.get('birthday')).format('DD MMMM YYYY')
			},
		]
		const contactInfo = [
			{
				key: strings.email,
				value: this.props.user.get('email')
			},
			{
				key: strings.phone,
				value: this.props.user.get('phone_code') + ' ' + this.props.user.get('phone')
			}
		]

		const addressInfo = [
			{
				key: strings.country,
				value: this.props.user.get('address').get('origin_country')
			},
			{
				key: strings.postalCode,
				value: this.props.user.get('address').get('post_code')
			},
			{
				key: strings.address,
				value: this.props.user.get('address').get('address')
			}
		]
		return (
			<div className="container dashboard-container">
				<Row className="justify-content-center">
					<div className="col col-md-8">
						<div className="d-flex">
							<div className="usr-image" style={{ backgroundImage: `url('${ this.props.user.get('avatar') }')` }} />
							<div className="d-flex justify-content-between full-width flex-column usr-name">
								<div className="font16 text-gray-80 font-weight-semi-bold">{ strings.my_profile }</div>
								<div className="font36 font-weight-bold text-black-semi" >{ firstName + ' ' + lastName }</div>
								<div className="font16 text-gray-80 font-weight-semi-bold d-flex align-items-center">{ strings.transaction } &emsp;
									<TradeLevel
										className="font16 usr-lvl"
										level={ response }
									/>
								</div>
							</div>
							<div className="usr-edit d-flex align-items-center ">
								<label className="font16 text-secondary clickable font-weight-semi-bold" onClick={ () => this.setState({ modalEditProfile: true }) } >{ strings.edit_profile }</label>
							</div>
						</div>
						<hr className="usr-hr" />
						<Row className="usr-row">
							<div className="col col-md-8">
								<TitleWithHr
									className="font24"
									title={ strings.basic_information }
								/>
								<ProfileTable
									data={ basicInfo }
								/>
							</div>
							<div className="col col-md-4">
								<TitleWithHr
									className="font24"
									title={ strings.settings }
								/>
								<div className="font16 text-secondary font-weight-semi-bold">
									<label className="clickable" onClick={ () => this.setState({ modalChangePassword: true }) }>{ strings.change_password }</label>
								</div>
								<div className="font16 text-secondary font-weight-semi-bold">
									<label className="clickable" onClick={ () => this.setState({ modalUploadIdCard: true }) }>{ strings.upload_id_card }</label>
								</div>
							</div>
						</Row>
						<Row className="usr-row">
							<div className="col col-md-8">
								<TitleWithHr
									className="font24"
									title={ strings.contact_information }
								/>
								<ProfileTable
									data={ contactInfo }
								/>
							</div>
						</Row>
						<Row className="usr-row">
							<div className="col col-md-8">
								<TitleWithHr
									className="font24"
									title={ strings.address }
								/>
								<ProfileTable
									data={ addressInfo }
								/>
							</div>
						</Row>
					</div>
				</Row>
				<ModalChangePassword 
					open={ this.state.modalChangePassword }
					onClose={ () => this.setState({ modalChangePassword: false }) }
					loading={ this.props.loading }
					onClick={ (payload) => this.updatePassword(payload) }
				/>
				<ModalEditProfile
					open={ this.state.modalEditProfile }
					countries={ this.props.countries }
					onClose={ () => this.setState({ modalEditProfile: false }) }
					user={ this.props.user }
					updateUser={ (payload, id) => this.updateProfile(payload, id) }
					loading={ this.props.loading }
					profileUrl={ this.state.profileUrl }		
					onImgClick = { () => this.uploadImgProfile.click() }
				/>
				<ModalIdCard
					open={ this.state.modalUploadIdCard }
					onButtonClick = { () => this.upload.click() }
					imagePreviewUrl={ this.state.imagePreviewUrl }
					onClose={ () => this.setState({ modalUploadIdCard: false }) }
					onSendImage={ this.onSendImage }
					loading={ this.props.loading }
				/>
				<input 
					id="file"
					type="file"
					accept="image/*"
					ref={ (ref) => this.upload = ref }
					onChange={ (e) => this.handleImageChange(e) }
					className="d-none"
				/>
				<input 
					id="file"
					type="file"
					accept="image/*"
					ref={ (ref) => this.uploadImgProfile = ref }
					onChange={ (e) => this.handleProfileChange(e) }
					className="d-none"
				/>
			</div>
		)
	}
}

Profile.propTypes = {
	loading: PropTypes.bool,
	countries: PropTypes.any,
	user: PropTypes.object,
	getUser: PropTypes.func,
	updateUser: PropTypes.func,
	getCountries: PropTypes.func,
	updatePassword: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.getLoading(),
	countries: selectors.getCountries(),
	user: getUser(),
})

const mapDispatchToProps = (dispatch) => ({
	getUser: (id) => dispatch(actions.getUser(id)),
	getCountries: () => dispatch(actions.getCountries()),
	updateUser: (payload, id, photoPayload) => dispatch(actions.updateProfile(payload, id, photoPayload)),
	updatePassword: (payload) => dispatch(actions.updatePassword(payload))
})

export default connect (mapStateToProps, mapDispatchToProps)(Profile)