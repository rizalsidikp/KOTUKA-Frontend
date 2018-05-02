import React, { Component } from 'react'
import Banner from '../../components/Banner'

import './style.scss'
import FormInputMoney from './../../components/FormInputMoney'
import strings from '../../localizations'
import Row from '../../components/Row'
import Ilustration from '../../components/Ilustration'
import Faq from '../../components/Faq'
import AboutUs from '../../components/AboutUs'
import Footer from '../../components/Footer'
import TradeBox from '../../components/TradeBox'



class Home  extends Component {

	

	render() {
		return (
			<div>
				<div className="container-fluid background-secondary">
					<div className="container home-container">
						<Banner />
						<FormInputMoney />
						<TradeBox />
					</div>
				</div>
				<h2 className="font24 text-secondary font-weight-bold text-center home-h2">{ strings.best_way }</h2>
				<Row>
					<span className="font20 text-gray font-weight-semi-bold mx-auto home-curr">{ strings.trading_currency }</span>
				</Row>
				<Ilustration title="Completely Secure" subtitle="Completely Secure" />
				<Ilustration title="Under 24 Hour Transaction" subtitle="Under 24 Hour Transaction" reverse={ true } />
				<Ilustration title="Easy To Use" subtitle="Easy To Use" />
				<Faq />
				<AboutUs />
				<Footer />
			</div>
		)
	}
}

export default Home