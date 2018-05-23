import React, { Component } from 'react'
import Row from '../../components/Row'

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

class Profile extends Component {
	constructor(props){
		super(props)
		this.state = {
			modalChangePassword: false
		}
	}
	componentWillMount() {
		this.props.getUser(this.props.user.get('id'))
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
				value: this.props.user.get('birthdate')
			},
		]
		const contactInfo = [
			{
				key: strings.email,
				value: this.props.user.get('email')
			},
			{
				key: strings.phone,
				value: this.props.user.get('phone')
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
								<div className="font16 text-primary font-weight-semi-bold">
									<label className="clickable" onClick={ () => this.setState({ modalChangePassword: true }) }>{ strings.change_password }</label>
								</div>
								<div className="font16 text-primary font-weight-semi-bold">
									<label className="clickable">{ strings.upload_id_card }</label>
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
							</div>
						</Row>
					</div>
				</Row>
				<ModalChangePassword 
					open={ this.state.modalChangePassword }
					onClose={ () => this.setState({ modalChangePassword: false }) }
				/>
			</div>
		)
	}
}

Profile.propTypes = {
	loading: PropTypes.bool,
	user: PropTypes.object,
	getUser: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.getLoading(),
	user: getUser()
})

const mapDispatchToProps = (dispatch) => ({
	getUser: (id) => dispatch(actions.getUser(id))
})

export default connect (mapStateToProps, mapDispatchToProps)(Profile)