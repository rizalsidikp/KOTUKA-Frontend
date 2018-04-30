import React, { Component } from 'react'
import Row from '../Row'

import './style.scss'

class Pagination extends Component {
	render() {
		return (
			<Row className="justify-content-center pg-row">
				<button className="button-sm button-black button-rounded button-pagination font-weight-bold" disabled>Prev</button>
				<div className="font16 font-weight-bold horizontal-padding">1/2</div>
				<button className="button-sm button-black button-rounded button-pagination font-weight-bold">Next</button>
			</Row>
		)
	}
}

export default Pagination