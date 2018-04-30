import React, { Component } from 'react'

import strings from './../../localizations'
import './style.scss'
import { Logo } from './../../images'

import Row from './../Row'
import ModalLogin from '../ModalLogin'
import ModalHelp from '../ModalHelp'


class Header extends Component {
	constructor(props){
		super(props)
		this.state={
			modalLogin : false,
			modalHelp: false
		}
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
							<div className="header-button">
								{strings.english}
							</div>
							<div className="header-button">
								{strings.about}
							</div>
							<div className="header-button" onClick={ () => this.setState({ modalHelp: true }) }>
								{strings.help}
							</div>
						</div>
						<div className="col col-md-auto d-flex align-items-center">
							<div className="header-button">
								{strings.register}
							</div>
							<div className="header-button" onClick={ () => this.setState({ modalLogin: true }) }>
								{strings.login}
							</div>
						</div>
					</Row>
				</div>

				<ModalLogin
					open={ this.state.modalLogin }
					onClose={ () => this.setState({ modalLogin: false }) }
				/>
				<ModalHelp
					open={ this.state.modalHelp }
					onClose={ () => this.setState({ modalHelp: false }) }
				/>
			</div>	
		)
	}
}

export default Header