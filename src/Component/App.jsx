import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './Login';
import Header from './header';
import register from './register';
import todoList from './todoList';
import splashScreen from "./splashScreen"
import admin from "./admin/admin"
import profile from "./profile"

// membikin function untuk melogin
const keeplogin = (user) => {
	return {
		type: 'login_success',
		data: {
			user_name: user.user_name,
			iduser:user.iduser
		}

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
				</BrowserRouter>
			);
		} else {
            return(
            <BrowserRouter>
            <Route path="/loading" component={splashScreen}/>
            </BrowserRouter>
            )
        }
	}
}

export default connect(null, { keeplogin })(app);
