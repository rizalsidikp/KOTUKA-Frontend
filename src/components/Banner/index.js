import React, { Component } from 'react'

import Row from './../Row'
import strings from '../../localizations'

import './style.scss'

class  Banner extends Component {
	render() {
		return (
			<Row>
				<div className="col col-md-6">
					<h1 className="font36 text-white font-weight-bold">{ strings.com_make_dif }</h1>
					<span className="font20 text-white">{ strings.trade_with }<br />{ strings.help_each }</span>
				</div>
				<div className="col col-md-6">
					<div className="banner-ilustrasi">
						ilustrasi
					</div>
				</div>
			</Row>	
		)
	}
}

export default Banner