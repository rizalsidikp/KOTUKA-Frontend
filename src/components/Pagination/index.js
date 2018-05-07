import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from '../Row'

import './style.scss'
import strings from '../../localizations'

class Pagination extends Component {
	render() {
		const on_page = parseInt(this.props.detailPage.get('on_page'))
		const total_page = parseInt(this.props.detailPage.get('total_page'))
		return (
			<Row className="justify-content-center pg-row">
				<button className="button-xs button-black button-pagination" onClick={ () => this.props.onStartTrading(on_page - 1) } disabled={ on_page === 1 || this.props.disabled }>{ strings.prev }</button>
				<div className="font16 font-weight-bold horizontal-padding">{ on_page }/{ total_page }</div>
				<button className="button-xs button-black button-pagination" onClick={ () => this.props.onStartTrading(on_page + 1) } disabled={ on_page === total_page || this.props.disabled }>{ strings.next }</button>
			</Row>
		)
	}
}

Pagination.propTypes = {
	detailPage: PropTypes.object,
	onStartTrading: PropTypes.func,
	disabled: PropTypes.bool
}

export default Pagination