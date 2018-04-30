import React, { Component } from 'react'
import Row from '../../components/Row'

import './style.scss'

import { Logo } from './../../images'
import strings from '../../localizations'
import CopyRight from '../../components/CopyRight'
import LabelInput from '../../components/LabelInput'

class SecondRegistration extends Component {
	render() {
		return (
			<div>
				<div className="container sr-container">
					<Row className="justify-content-center">
						<div className="col col-md-12 text-center">
							<img src={ Logo } className="sr-logo" />
						</div>
						<div className="col col-md-6 background-blue-light sr-form">
							<h1 className="font20 text-blue-dark font-weight-bold">{ strings.lets_complete_your_profile }</h1>
							<LabelInput name='first_midle_name' label={ strings.first_n_midle_name } placeholder={ strings.first_n_midle_name } /> 
							<LabelInput name='last_name' label={ strings.last_name } placeholder={ strings.last_name } /> 
							<LabelInput name='phone' label={ strings.phone } placeholder={ strings.phone } /> 
							<LabelInput type='date' name='birthdate' label={ strings.birthdate } placeholder={ strings.birthdate } />
							<LabelInput type='textarea' name='address' label={ strings.address } placeholder={ strings.address } />
						</div>
					</Row>
				</div>
				<CopyRight />
			</div>
		)
	}
}

export default SecondRegistration