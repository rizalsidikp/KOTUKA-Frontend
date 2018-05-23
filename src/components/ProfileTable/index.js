import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ProfileTable extends Component {
	render() {
		return (
			<table className="full-width">
				<tbody>
					{
						this.props.data && this.props.data.map((d, idx) => {
							return(
								<tr key={ idx }>
									<td className="font16 text-gray font-weight-semi-bold" style={{ width: '50%' }}>{ d.key }</td>
									<td className="font16 text-black-semi" >{ d.value }</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>	
		)
	}
}

ProfileTable.propTypes = {
	data: PropTypes.array
}

export default  ProfileTable