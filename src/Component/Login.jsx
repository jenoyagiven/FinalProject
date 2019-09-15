import React, {Component} from "../../node_modules/react"
import {connect} from "react-redux"
import axios from "axios"

class Login extends Component{

    onLoginUser = () => {
        // memasuk input dari login
        let data_username = this.Username.value
        let data_password = this.Password.value

        // mengambil data dari database
        axios.get(
            "http://localhost:2004/users",{
                params:{
                    username: data_username,
                    password: data_password
                }
            }
        ).then((res) => {
            if(res.data.length){
                let {id, user} = res.data[0]

                // membikin action untuk reducer
                return(
                    {
                        type: "login_success",
                        payload:{
                            id, user
                        }
                    }
                )
            }  
        })
    }


    

    render(){
        if(!this.props.user_name){
        return(
            
            <div>
                <div className="col-sm-4 mx-auto mt-5 card">
                    
                    <div className="card-title border-bottom border-secondary">
                    <h1>Login</h1>
                    </div>

                    {/* membikin input username */}
                    <div className='form-group'>
                        <div className="card-title">
                        <h4>Username</h4>
                        <input ref = {input => {this.Username = input}} className="form-control" type="text" />
                        </div>
                    </div>

                    {/* membikin input password */}
                    <div className='form-group'>
                        <div className="card-title">
                        <h4>Password</h4>
                        <input  ref = {input => {this.Password = input}} className="form-control" type="text" />
                        </div>
                    </div>
                </div>
            </div>
    
        )
    } else{
        return <Redirect to="/"/>
    }

    }
}

mapStateToProps = state => {
    return{
        user_name:state.auth.username
    }
}

export default connect(mapStateToProps, {onLoginUser})(Login)