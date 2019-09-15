import React, {Component} from 'react'
import axios from "axios"

class register extends Component{

    onRegisterClick = () => {
        let dataPassword = this.password.value
        let dataUsername = this.username.value

        axios.post(
            "http://localhost:2004/users",
            {
                username: dataPassword,
                password: dataUsername
            }
        ).then((res) => {
            alert("berhasil")
        })
    }

    render(){
        return(
            
                <div className="col-sm-4 mx-auto mt-5 card">
                    
                    <div className="card-title border-bottom border-secondary">
                    <h1>Login</h1>
                    </div>

                    {/* membikin input username */}
                    <div className='form-group'>
                        <div className="card-title">
                        <h4>Username</h4>
                        <input ref = {input => {this.username = input}} className="form-control" type="text" />
                        </div>
                    </div>

                    {/* membikin input password */}
                    <div className='form-group'>
                        <div className="card-title">
                        <h4>Password</h4>
                        <input ref = {input => {this.password = input}} className="form-control" type="password" />
                        </div>
                    </div>

                    {/* membikin button */}
                    <div className='form-group'>
                        <div className="card-title">
                            <button className="btn btn-outline-primary form-control" onClick={this.onRegisterClick}>register</button>
                        </div>
                    </div>

                </div>
        
        )
    }
}

export default register