import React, { Component } from 'react'
import Row from '../../components/Row'
// import PropTypes from 'prop-types'

import './style.scss'

import { Logo } from './../../images'
import strings from '../../localizations'
import LabelInput from '../../components/LabelInput'
import CopyRight from '../CopyRight'

class Confirmation extends Component {

	constructor(props){
		super(props)
		this.state = {
			password: '',
			c_password: ''
		}
	}

	render() {
		return (
			<div>
				<div className="container confirm-container">
					<Row>
						<div className="col col-md-12 text-center">
							<img src={ Logo } className='confirm-logo' />
						</div>
						<div className="col col-md-5 mx-auto card reset-card">
							<h1 className="font24 text-black-semi font-weight-bold no-margin">{ strings.reset_password }</h1>
							<hr />
							<LabelInput type="password" name="new_password" label={ strings.your_new_password } placeholder={ strings.password } value={ this.state.password } onChange={ (e) => this.setState({ password: e.target.value }) } />
							<LabelInput type="password" name="confirm_new_password" label={ strings.confirm_new_password } placeholder={ strings.password } value={ this.state.c_password } onChange={ (e) => this.setState({ c_password: e.target.value }) } />
							<button className="button button-primary">{ strings.reset }</button>
						</div>
					</Row>
				</div>
				<CopyRight />
			</div>
		)
	}
}

// Confirmation.propTypes = {
// 	location: PropTypes.object
// }

export default Confirmation