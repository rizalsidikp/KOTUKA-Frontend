import React, {
	Component
} from 'react'

import { LogoCircle } from './../../images'

let keyframes = `
@keyframes App-logo-spin {
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
}
`

let styleSheet = document.styleSheets[0]
styleSheet.insertRule(keyframes, styleSheet.cssRules.length)


class Loading extends Component {
	constructor(props) {
		super(props)
		this.state = {speed: 1, size : 80}
	}
	render() {
		return (
			<div>
				<img src = { LogoCircle }
					style = {{animation: `App-logo-spin infinite ${this.state.speed}s linear`, height: `${this.state.size}px`}}
					className = "App-logo"
					alt = "logo"
				/>
			</div>
		)
	}
}

export default Loading