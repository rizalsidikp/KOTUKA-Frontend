import React, { Component } from 'react'
import Row from '../Row'

import './style.scss'

class Pagination extends Component {
	render() {
		return (
			<Row className="justify-content-center pg-row">
				<button className="button-xs button-black button-pagination" disabled>Prev</button>
				<div className="font16 font-weight-bold horizontal-padding">1/2</div>
				<button className="button-xs button-black button-pagination">Next</button>
			</Row>
		)
	}
}

export default Pagination