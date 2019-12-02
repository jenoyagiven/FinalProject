import React, { Component } from 'react';
import { connect } from 'react-redux';
import {verifiedRegister} from "../actions/index"

class VerifyLink extends Component {
	componentDidMount() {
		// check local storage
		let storagedata = JSON.parse(localStorage.getItem('Userdata'));		

		if (storagedata) {
			// userStorage send ke redux
			this.props.verifiedRegister(storagedata);
		}
	}

	render() {
			return (
				<div style={{textAlign:"center"}}>
					<h1>Verify Success</h1>
					
				</div>
			);
		
	}
}


export default connect(null, { verifiedRegister })(VerifyLink);
