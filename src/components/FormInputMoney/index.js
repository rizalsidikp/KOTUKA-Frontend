import React, { Component } from 'react'
import InputMoney from '../InputMoney'
import PropTypes from 'prop-types'
import Row from '../Row'

import oxr from 'open-exchange-rates'

import config from './../../config'

import './style.scss'
import strings from '../../localizations'
import { LogoCircle } from './../../images'

class FormInputMoney extends Component {
	constructor(props){
		super(props)
		this.state = {
			needMoney : '',
			haveTransfer: '',
		}
	}

	

	render() {
		const { theme = 'white' } = this.props
		return (
			<div>
				<Row className="fim-row">
					<div className="col">
						<InputMoney
							label={ strings.i_need }
							theme={ theme }
							value={ this.state.needMoney }
							onChange={ (e) => this.setState({ needMoney : e.target.value }) }
						/>
					</div>
					<div className="col col-md-auto no-padding d-flex align-items-center fim-center">
						<img src={ LogoCircle } />
					</div>
					<div className="col">
						<InputMoney 
							label={ strings.you_have_to_transfer }
							theme={ theme }							
							value={ this.state.haveTransfer }
							onChange={ (e) => this.setState({ haveTransfer : e.target.value }) }
						/>
					</div>
				</Row>
				<Row>
					<div className="col col-xs-12 text-center">
						<button className="button text-uppercase button-yellow button-rounded button-shadow font-weight-bold">{ strings.get_start }</button>
					</div>
				</Row>
			</div>
		)
	}
}

FormInputMoney.propTypes = {
	theme: PropTypes.string
}

export default FormInputMoney