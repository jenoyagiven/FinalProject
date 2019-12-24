import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// user section
import Login from './Login';
import Header from './header';
import register from './register';
import todoList from './todoList';
import profile from './profile';
import VerifyLink from './verifyLink';
import subscription from './subscription';
import payment from './payment';

// admin section
import adminTodoUser from './admin/adminTodouser';

// membikin function untuk melogin
const keeplogin = (user) => {
	console.log(user.username);
	
	if (user.username) {
		return (dispatch) => {
			dispatch({
				type: 'login_success',
				data: {
					username: user.username,
					id: user.id
				}
			});
		};
	} else if (user.admin) {
		return (dispatch) => {
			dispatch({
				type: 'admin_login',
				data: {
					admin: user.admin,
					id: user.id
				}
			});
		};
	}
};

class app extends Component {
	componentDidMount() {
		// mengambil data dari localstorage untuk user
		var userStorage = JSON.parse(localStorage.getItem('userData'));

		// mengambil data dari localstorage untuk admin
		var adminStorage = JSON.parse(localStorage.getItem('adminData'));

		// meglogin untuk user
		if (userStorage) {
			this.props.keeplogin(userStorage);
		}

		// meglogin untuk admin
		if (adminStorage) {
			this.props.keeplogin(adminStorage);
		}
	}

	render() {
		return (
			<BrowserRouter>
				<Header />
				<Route path="/login" component={Login} />
				<Route path="/register" component={register} />
				<Route path="/" exact component={todoList} />
				<Route path="/profile" component={profile} />
				<Route path="/verifyLink" component={VerifyLink} />
				<Route path="/subscription" component={subscription} />
				<Route path="/payment" component={payment} />
				<Route path="/adminTodouser" component={adminTodoUser} />
			</BrowserRouter>
		);
	}
}

export default connect(null, { keeplogin })(app);
