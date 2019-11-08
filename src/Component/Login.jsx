import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onLoginClick } from '../actions/index';
import { Redirect } from 'react-router-dom';
import Background from "../Image/backgroundPattern-2.png"
 

class Login extends Component {
	LoginSend = () => {
		let username = this.data_username.value;
		let password = this.data_password.value;
		let email = this.data_email.value

		this.props.onLoginClick(username, password, email);
	};

	render() {
		// // background
		// var sectionStyle = {
		// 	width: '100%',
		// 	height: '400px',
		// 	backgroundImage: `url(${Background})`
		// };
		if (!this.props.user_name) {
			return (
				<div >
					<div className="col-sm-4 mx-auto mt-5 card background">
						<div className="card-title border-bottom border-secondary">
							<h1>Login</h1>
						</div>

						{/* membikin input username */}
						<div className="form-group">
						<div className="card-title">
							<h4>Username</h4>
							<input
								ref={(input) => {
									this.data_username = input;
								}}
								className="form-control"
								type="text"
							/>
						</div>
					</div>

					{/* membikin input password */}
					<div className="form-group">
						<div className="card-title">
							<h4>Password</h4>
							<input
								ref={(input) => {
									this.data_password = input;
								}}
								className="form-control"
								type="password"
							/>
						</div>
					</div>

					<div className="form-group">
						<div className="card-title">
							<h4>Email</h4>
							<input
								ref={(input) => {
									this.data_email = input;
								}}
								className="form-control"
								type="email"
							/>
						</div>
					</div>

						{/* membikin button */}
						<div className="form-group">
							<input
								type="button"
								value="Login"
								className=" form-control btn btn-outline-primary"
								onClick={this.LoginSend}
							/>
						</div>
					</div>
				</div>
			);
		} else {
			return <Redirect to="/" />;
		}
	}
}
const msp = (state) => {
	return {
		user_name: state.auth.username
	};
};

// mengconnect reducer dan file login
export default connect(msp, { onLoginClick })(Login);
