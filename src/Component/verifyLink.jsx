import React, { Component } from 'react';
import {connect} from "react-redux"
import {onRegisterClick} from "../actions/index"
import redirect from "react-router-dom"

class VerifyLink extends Component{
    componentDidMount(){
        this.props.onRegisterClick()
    }

    render(){
        if(!this.props.user_name){
        return(
    <div>
        <h1 className="mx-auto my-auto">Verify Success</h1>
    </div>
    )
}
    }

}

const mapStateToProps = (state) => {
    return{
    user_name:state.auth.username
}
}

export default connect(mapStateToProps,{onRegisterClick})(VerifyLink) 