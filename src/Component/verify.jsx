import React, { component } from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { verifiedRegister } from "../actions/index";

class VerifyLink extends Component {
  componentDidMount() {
    // check local storage
    let storageData = JSON.parse(localStorage.getItem("userData"));

    if (storageData) {
      // userStorage send ke redux
      this.props.verifiedRegister(storageData);
    }
  }
  render(){
      return(
          <div style={{textAlign:"center"}}>
              <h1>Verify Success</h1>
          </div>
      )
  }
}

export default connect(null, {verifiedRegister})(VerifyLink)

