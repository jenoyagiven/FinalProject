import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
const url_api = 'http://localhost:2004';

class adminTodoList extends Component {
	state = {
		data: [],
		image: []
	};

	componentDidMount = () => {
		this.getdata();
	};

	// mengambil data
	getdata = () => {
		axios
			.get(url_api + '/authRouter/GetUsers')
			.then((res) => {
				this.setState({
					data: res.data
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// // mengambil gambar dari folder
	// getImage = (filename) => {
	// 	axios
	// 		.get(url_api + `/payImage/1576125486323.jpeg`)
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			this.setState({
	// 				image: res.data
	// 			});
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	// mengrender todo
	renderTodo = () => {
		let hasilRender = this.state.data.map((todos) => {
			return (
				<tr>
					<td>{todos.username}</td>
					<td>{todos.password}</td>
					<td>{todos.email}</td>
					<td>{todos.subscription}</td>
					<td>{todos.paymentMethod}</td>
					<td>{todos.creditNumber}</td>
					<td>{todos.expiryDate}</td>
					<td>{todos.securityCode}</td>
					<td>
						<img src={`http://localhost:2004/payImage/${todos.paymentProof}`} height="50" width="50" />
					</td>
					<td>
						<button className="btn btn-outline-info" onClick={() => this.getImage(todos.paymentProof)}>
							verify
						</button>
					</td>
				</tr>
			);
		});

		return hasilRender;
	};

	render() {
		if (this.props.user_admin) {
			return (
				<div className="container mt-5 ">
					<div className="card">
						<table className="table table-sm text-center">
							<thead>
								<tr>
									<th>Username</th>
									<th>Password</th>
									<th>Email</th>
									<th>Subscription</th>
									<th>Payment Method</th>
									<th>Credit Number</th>
									<th>Expiry Date</th>
									<th>Security Code</th>
									<th>Payment Image</th>
									<th>transaction verify</th>
								</tr>
							</thead>
							<tbody>{this.renderTodo()}</tbody>
						</table>
					</div>
				</div>
			);
		} else {
			return <Redirect to="/login" />;
		}
	}
}

// mengambil data dari state reducer
const mapStateToProps = (state) => {
	return {
		user_admin: state.auth.admin
	};
};

export default connect(mapStateToProps, null)(adminTodoList);
