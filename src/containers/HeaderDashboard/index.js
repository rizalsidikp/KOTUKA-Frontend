import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from './../Header/selectors'
import * as actions from './../Header/actions'
import PropTypes from 'prop-types'

import './style.scss'

import Row from './../../components/Row'

import strings from '../../localizations'
import history from './../../history'
import { Logo } from './../../images'

class HeaderDashboard extends Component {

	linkTo = (link) => {
		if(this.props.location.pathname !== link){
			return history.push(link)
		}
	}

	render() {
		return (
			<div className="container">
				<div className="background-secondary hd-top-border" />
				<Row className="align-items-center hd-row">
					<div className="col col-md-auto">
						<img src={ Logo } />
					</div>
					<div className="col d-flex align-items-center">
						<div className={ 'hd-button '.concat(this.props.activePage === 'post' ? 'hd-button-active' : '') } onClick={ () => this.linkTo('/dashboard/post') }>
							{ strings.post }
						</div>
						<div className={ 'hd-button '.concat(this.props.activePage === 'transaction' ? 'hd-button-active' : '') } onClick={ () => this.linkTo('/dashboard/transaction') }>
							{strings.transaction}
						</div>
						<div className={ 'hd-button '.concat(this.props.activePage === 'recipient' ? 'hd-button-active' : '') } onClick={ () => this.linkTo('/dashboard/recipient/myself') }>
							{strings.recipient}
							{
								this.props.activePage === 'recipient' &&
								<div className="header-sub">
									<div className="triangle" />
									<Row className="header-sub-content align-items-center
									">
										<div className={ 'col hd-menu col-md-auto text-secondary-semi '.concat(this.props.activeSubPage === 'myself' ? 'text-white' : 'clickable') } onClick={ () => this.linkTo('/dashboard/recipient/myself') }>
											{ strings.myself }
										</div>
										<div className={ 'col hd-menu col-md-auto text-secondary-semi '.concat(this.props.activeSubPage === 'someoneelse' ? 'text-white' : 'clickable') } onClick={ () => this.linkTo('/dashboard/recipient/someoneelse') }>
											{ strings.someone_else }
										</div>
									</Row>
								</div>
							}
						</div>
						<div className={ 'hd-button '.concat(this.props.activePage === 'profile' ? 'hd-button-active' : '') } onClick={ () => this.linkTo('/dashboard/profile') }>
							{strings.profile}
						</div>
					</div>
					<div className="col col-md-auto d-flex align-items-center clickable font-weight-bold text-primary" onClick={ this.props.logout }>
						<div className='hd-image' style={{ backgroundImage: `url('${ this.props.user.get('avatar') }')` }} /> Logout
					</div>
				</Row>
			</div>
		)
	}
}

HeaderDashboard.propTypes = {
	activePage : PropTypes.string,
	activeSubPage : PropTypes.string,
	location: PropTypes.object,
	params: PropTypes.object,
	loading: PropTypes.bool,
	setInitialState: PropTypes.func,
	loginWithFacebook: PropTypes.func,
	loginWithGoogle: PropTypes.func,
	login: PropTypes.func,
	register: PropTypes.func,
	setLoading: PropTypes.func,
	user: PropTypes.object,
	logout: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.getLoading(),
	user: selectors.getUser()
})

const mapDispatchToProps = (dispatch) => ({
	setInitialState: () => dispatch(actions.setInitialState()),
	loginWithGoogle: () => dispatch(actions.loginWithGoogle()),
	loginWithFacebook: () => dispatch(actions.loginWithFacebook()),
	login: (username, password) => dispatch(actions.login(username, password)),
	register: (username, password) => dispatch(actions.register(username, password)), 
	setLoading: (loading) => dispatch(actions.setLoading(loading)),
	logout: () => dispatch(actions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDashboard)