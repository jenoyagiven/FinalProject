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

	deleteUser = (id) => {
		axios
			.delete(url_api + `/authRouter/deleteUser/${id}`)
			.then((res) => {
				this.getdata();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	verifyTransaction = (id) => {
		console.log(id);

		axios
			.patch(url_api + `/authRouter/verfiyTran/${id}`)
			.then((res) => {
				console.log('test');
				this.getdata();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	//
	BtnClass = (todos) => {
		return todos.subscription == 'free' ? (
			<button className={'btn btn-outline-primary'} onClick={() => this.verifyTransaction(todos.id)}>
				Verify
			</button>
		) : (
			<button className={'btn btn-outline-secondary'} onClick={() => this.verifyTransaction(todos.id)} disabled>
				Verified
			</button>
		);
	};

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
						<img src={`http://localhost:2004/image/${todos.paymentProof}`} height="50" width="50" />
					</td>
					<td> {this.BtnClass(todos)}</td>
					<td>
						<button
							className="btn btn-outline-danger"
							onClick={() => {
								this.deleteUser(todos.id);
							}}
						>
							Delete
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
					<div class="card border-2">
						<div class="card-block">
							{/* to delete space below of card table add - mb-0 in table */}
							<table className="table table-sm table-bordered text-center mb-0">
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
										<th>Transaction Verify</th>
										<th>Delete User</th>
									</tr>
								</thead>
								<tbody>{this.renderTodo()}</tbody>
							</table>
						</div>
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
