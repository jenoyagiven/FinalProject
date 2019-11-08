import React, {Component} from "react"
import {connect} from "react-redux"
import profile from "../Image/user.png"
import {Table} from "reactstrap"

class Profile extends Component{
render() {
    return (
            <div className="card container mx-auto mt-5">
                <Table className="table text-center">
                <thead>    
                <tr>
                    <td><img src={profile} width="150" height="150"/></td>
                </tr>
                </thead>
                <tbody>
                <tr>
                
                </tr>
                </tbody>
                </Table>
            </div>
    )
}
}

const mstp = (state) => {
	return {
		user_name: state.auth.username
	};
};

export default connect(mstp)(Profile) 