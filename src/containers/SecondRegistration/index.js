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
						<div className="col col-md-4 sr-card">
							<div className="background-secondary sr-title">
								<h1 className="font24 text-white font-weight-bold">{ strings.before_we_move } , <br /> { strings.lets_complete_your_profile }</h1>
							</div>
							<div className="sr-form text-center">
								<div className="sr-photo-profile mx-auto clickable" />
								<label className="mx-auto font16 text-primary font-weight-semi-bold clickable">{ strings.upload }</label>
								<LabelInput name='first_midle_name' label={ strings.first_n_midle_name } placeholder={ strings.first_n_midle_name } /> 
								<LabelInput name='last_name' label={ strings.last_name } placeholder={ strings.last_name } /> 
								<LabelInput name='phone' label={ strings.phone } placeholder={ strings.phone } /> 
								<LabelInput type='date' name='birthdate' label={ strings.birthdate } placeholder={ strings.birthdate } />
								<LabelInput type='textarea' name='address' label={ strings.address } placeholder={ strings.address } />
								<button className="button button-primary full-width">{ strings.complete_my_profile }</button>
							</div>
						</div>
					</Row>
				</div>
				<CopyRight />
			</div>
		)
	}
}

export default SecondRegistration