import React, { Component } from 'react';
import { connect } from 'react-redux';
import {onRegisterClick} from "../actions/index"
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2';
const url_api = 'http://localhost:2004/';

class register extends Component {

	RegisterClick = () => {
	    let Datausername = this.username.value
		let Datapassword = this.password.value
		let Dataemail = this.email.value

	    this.props.onRegisterClick(Datausername, Datapassword, Dataemail)
	}

	render() {
		if (!this.props.user_name) {
			return (
				<div className="col-sm-4 mx-auto mt-5 card">
					<div className="card-title border-bottom border-secondary">
						<h1>Register</h1>
					</div>

					{/* membikin input username */}
					<div className="form-group">
						<div className="card-title">
							<h4>Username</h4>
							<input
								ref={(input) => {
									this.username = input;
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
									this.password = input;
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
									this.email = input;
								}}
								className="form-control"
								type="email"
							/>
						</div>
					</div>


					{/* membikin button */}
					<div className="form-group">
						<button className="btn btn-outline-primary form-control" onClick={this.RegisterClick}>
							register
						</button>
					</div>
				</div>
			);
		} else {
			return <Redirect to="/" />;
		}
	}
}

const mstp = (state) => {
	return {
		user_name: state.auth.username
	};
};

export default connect(mstp, {onRegisterClick})(register);
