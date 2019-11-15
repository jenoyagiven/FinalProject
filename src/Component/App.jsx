import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './Login';
import Header from './header';
import register from './register';
import todoList from './todoList';
import splashScreen from './splashScreen';
import admin from './admin/admin';
import profile from './profile';
import VerifyLink from './verifyLink';
import subscription from './subscription';
import payment from './payment';

// membikin function untuk melogin
const keeplogin = (user) => {
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
class app extends Component {
	state = {
		allow: false
	};

	componentDidMount() {
		// mengcheck kalau sudah ada di localstorage
		let userStorage = JSON.parse(localStorage.getItem('userData'));

		if (userStorage) {
			this.props.keeplogin(userStorage);
		}
		this.setState({
			allow: true
		});
	}

	render() {
		if (this.state.allow == true) {
			return (
				<BrowserRouter>
					<Header />
					<Route path="/login" component={Login} />
					<Route path="/register" component={register} />
					<Route path="/" exact component={todoList} />
					<Route path="/admin" component={admin} />
					<Route path="/profile" component={profile} />
					<Route path="/verifyLink" component={VerifyLink} />
					<Route path="/subscription" component={subscription} />
					<Route path="/payment" component={payment} />
				</BrowserRouter>
			);
		} else {
			return (
				<BrowserRouter>
					<Route path="/loading" component={splashScreen} />
				</BrowserRouter>
			);
		}
	}
}

export default connect(null, { keeplogin })(app);
