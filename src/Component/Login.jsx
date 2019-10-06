import React, {Component} from 'react'
import axios from "axios"
import swal from "sweetalert2"

const url_api = 'http://localhost:2004/'

class Login extends Component{    

    onLoginClick = () => {
        let Username = this.data_username.value
        let Password = this.data_password.value
    
        axios.get(
            url_api + "authRouter/login",{
                params:{
                    username:Username, 
                    password:Password
                }
            }
        ).then((res) => {
            swal.fire("Logged In", "click the button to continue", "success")
        }).catch((err) => {
            alert("err")
            console.log(err);
            
        })
    }

    render(){
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
                        <input ref = {input => {this.data_username = input}} className="form-control" type="text" />
                        </div>
                    </div>

                    {/* membikin input password */}
                    <div className='form-group'>
                        <div className="card-title">
                        <h4>Password</h4>
                        <input  ref = {input => {this.data_password = input}} type="password" className="form-control" />
                        </div>
                    </div>

                    {/* membikin button */}
                    <div className="form-group">
                        <input type="button" value="Login" className=" form-control btn btn-outline-primary" onClick={this.onLoginClick}/>
                    </div>
                </div>
            </div>
    
        )
    

    }
}
    // const mapStateToProps = state => {
    //     return{
    //         user_name:state.auth.username
    //     }
    // }


export default (Login)