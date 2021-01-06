import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./Login";
import Header from "./header";
import register from "./register";
import todoList from "./todoList";
import admin from "./admin/admin";
import profile from "./profile";
import subscription from "./subscription"
import verify from "./verify"

// membikin function untuk melogin
const keeplogin = (user) => {
  return {
    type: "login_success",
    data: {
      name: user.name,
      idlist_user: user.idlist_user,
    },
  };
};
class app extends Component {
  state = {
    allow: false,
  };

  componentDidMount() {
    // mengcheck kalau sudah ada di localstorage
    let userStorage = JSON.parse(localStorage.getItem("userData"));
    

    if (userStorage) {
      this.props.keeplogin(userStorage);
    }

    setTimeout(() => {
      this.setState({
        allow: true,
      });
    }, 5000);
  }

  render() {
      return (
        <BrowserRouter>
          <Header />
          <Route path="/login" component={Login} />
          <Route path="/register" component={register} />
          <Route path="/" exact component={todoList} />
          <Route path="/admin" component={admin} />
          <Route path="/subscription" component={subscription} />
          <Route path="/profile" component={profile} />
          <Route path="/verifyLink" component={verify} />
        </BrowserRouter>
      );
    
  }
}

export default connect(null, { keeplogin })(app);
