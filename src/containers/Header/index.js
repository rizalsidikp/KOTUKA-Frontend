import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as selectors from './selectors'
import * as actions from './actions'
import PropTypes from 'prop-types'

import strings from './../../localizations'
import './style.scss'
import { Logo } from './../../images'

import Row from './../../components/Row'
import ModalLogin from './../../components/ModalLogin'
import ModalHelp from './../../components/ModalHelp'


class Header extends Component {
	constructor(props){
		super(props)
		this.state={
			modalLogin : false,
			modalHelp: false,
			type: ''
		}
	}

	componentWillMount() {
		this.props.setLoading(false)
	}

	setModalLogin = (modalLogin) => {
		this.setState({ modalLogin })
	} 

	onGoogleLogin = async() => {
		await this.props.loginWithGoogle()
	}
	onFacebookLogin = async() => {
		await this.props.loginWithFacebook()
	}
	onLogin = async(username, password) => {
		await this.props.login(username, password)
	}
	onRegister = async(username, password) => {
		await this.props.register(username, password)
	}

	sendEmail = async(payload) => {
		await this.props.sendEmail(payload)
		this.setState({ modalHelp: false })
	}

	closeModal = () => {
		this.setState({ modalLogin: false })
		this.props.setInvalid(false, '')
	}


	render() {
		return (
			<div className="container-fluid header-container" >
				<div className="container">
					<Row className="align-items-center">
						<div className="col col-md-auto">
							<img src={ Logo } />
						</div>
						<div className="col d-flex align-items-center justify-content-center">
							{/* <div className="header-button">
								{strings.english}
							</div> */}
							<div className="header-button">
								{strings.about}
							</div>
							<div className="header-button" onClick={ () => this.setState({ modalHelp: true }) }>
								{strings.help}
							</div>
						</div>
						<div className="col col-md-auto d-flex align-items-center">
							<div className="header-button"  onClick={ () => this.setState({ modalLogin: true, type: 'register' }) }>
								{strings.register}
							</div>
							<div className="header-button" onClick={ () => this.setState({ modalLogin: true, type: 'login' }) }>
								{strings.login}
							</div>
						</div>
					</Row>
				</div>

				<ModalLogin
					open={ this.state.modalLogin }
					onClose={ this.closeModal }
					loading={ this.props.loading }
					onGoogleLogin={ this.onGoogleLogin }
					onFacebookLogin={ this.onFacebookLogin }
					type={ this.state.type }
					onLogin={ (username, password) => {
						if(this.state.type === 'register'){
							this.onRegister(username, password)
						}else{
							this.onLogin(username, password)
						}
					} }
					invalid={ this.props.invalid }
					invalidMessage={ this.props.invalidMessage }
					setInvalid={ (invalid, invalidMessage) => this.props.setInvalid(invalid, invalidMessage) }
				/>
				<ModalHelp
					open={ this.state.modalHelp }
					onClose={ () => this.setState({ modalHelp: false }) }
					loading={ this.props.loading }
					onClick={ (payload) => this.sendEmail(payload) }
				/>
			</div>	
		)
	}
}

Header.propTypes = {
	loading: PropTypes.bool,
	setInitialState: PropTypes.func,
	loginWithFacebook: PropTypes.func,
	loginWithGoogle: PropTypes.func,
	login: PropTypes.func,
	register: PropTypes.func,
	setLoading: PropTypes.func,
	sendEmail: PropTypes.func,
	invalid: PropTypes.bool,
	invalidMessage: PropTypes.string,
	setInvalid: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.getLoading(),
	invalid: selectors.getInvalid(),
	invalidMessage: selectors.getInvalidMessage()
})

const mapDispatchToProps = (dispatch) => ({
	setInitialState: () => dispatch(actions.setInitialState()),
	loginWithGoogle: () => dispatch(actions.loginWithGoogle()),
	loginWithFacebook: () => dispatch(actions.loginWithFacebook()),
	login: (username, password) => dispatch(actions.login(username, password)),
	register: (username, password) => dispatch(actions.register(username, password)), 
	setLoading: (loading) => dispatch(actions.setLoading(loading)),
	sendEmail: (payload) => dispatch(actions.sendEmail(payload)),
	setInvalid: (invalid, invalidMessage) => dispatch(actions.setInvalid(invalid, invalidMessage))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)