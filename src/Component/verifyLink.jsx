import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from "react-router-dom"


const getstorage = (user) => {
	console.log(user.id);
	console.log(user.username);
	return (dispatch) => {
		dispatch({
			type: 'login_success',
			data: {
				username: user.username,
				id: user.id
			}
		});
	};
};
class VerifyLink extends Component {
	componentDidMount() {
		// check local storage
		let storagedata = JSON.parse(localStorage.getItem('Userdata'));

		if (storagedata) {
			// userStorage send ke redux
			this.props.getstorage(storagedata);
		}
	}

	render() {
			return (
				<div>
					<h1 className="mx-auto my-auto">Verify Success</h1>
				</div>
			);
		
	}
}

// mengambil data dari state reducer
const mapStateToProps = (state) => {
	return {
		user_id: state.auth.id,
		user_name: state.auth.username
	};
};

export default connect(mapStateToProps, { getstorage })(VerifyLink);
