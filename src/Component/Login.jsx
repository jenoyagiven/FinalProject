import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onLoginClick } from '../actions/index';
import { Redirect } from 'react-router-dom';

class Login extends Component {


	LoginSend = () => {
		let username = this.data_username.value;
		let password = this.data_password.value;

		this.props.onLoginClick(username, password);
	};

	render() {
		if (!this.props.user_name || this.props.user_admin) {
			return (
				<div>
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
		} else if (this.props.user_admin) {
			console.log(this.props.user_admin);
			return <Redirect to="/adminTodouser" />;
		} else if(this.props.user_name){
			return <Redirect to="/" />;
		}
	}
}
const msp = (state) => {
	return {
		user_name: state.auth.username,
	    user_admin: state.auth.admin
	};
};

// mengconnect reducer dan file login
export default connect(msp, { onLoginClick })(Login);
