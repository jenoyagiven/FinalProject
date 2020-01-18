import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import TimePicker from 'react-time-picker';
import Spinner from 'react-bootstrap/Spinner';
import swal from 'sweetalert2';
const url_api = 'http://localhost:2004';

class todoList extends Component {
	state = {
		Ctime: new Date(),
		data: []
	};

	// menentukan waktu alarm
	TimeChange = (time, todo) => {
		axios
			.patch(url_api + '/authRouter/setAlarm', {
				Alarm: time,
				todo: todo
			})
			.then((res) => {
				console.log(time);
				
				this.getdata()
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// mengambil waktu sekarang
	GetTime = () => {
		this.setState({
			Ctime: new Date().toLocaleTimeString('it-IT', {timeStyle:"short"})
		});
	};

	componentDidMount = () => {
		// menginisiasasikan setCurretTime setiap detik
		this.clock = setInterval(() => this.GetTime(), 1000);
		this.getdata();
	};

	// menginisiasasikan function waktu tab tertutup
	componentWillUnmount() {
		// sebuah function untuk menghentikan jam
		clearInterval(this.clock);
	}

	// mengambil data
	getdata = () => {
		axios
			.get(url_api + '/authRouter/gettodo')
			.then((res) => {
				this.setState({
					data: res.data
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// menambah todo
	addTodo = () => {
		let data_todo = this.todo.value;

		axios
			.post(url_api + '/authRouter/addtodo', {
				// menambah todo dengan useridi
				todo: data_todo,
				iduser: this.props.user_id
			})
			.then((res) => {
				this.getdata();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// kalau todo yang dilakukan sudah selesai
	complete = (id) => {
		// memakai id dari rendertodo
		axios
			.delete(url_api + `/authRouter/deletetodo/${id}`)
			.then((res) => {
				console.log(res);
				this.getdata();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// kalau alarm dan waktu sekarang sama tanda keluar
	alarm = (alarm, ctime) => {
		// console.log(alarm);
		// console.log(ctime);
		
		
		if (alarm == ctime) {
			console.log("test");
			
			axios
				.patch(url_api + `/authRouter/RingRing/${this.props.user_id}`)
				.then((res) => {
					console.log("succes");
				})
				.catch((err) => {
					console.log(err);
				});
		}

	};

	// mengrender todo
	renderTodo = () => {
		let hasilRender = this.state.data.map((todos) => {
			if (todos.iduser == this.props.user_id) {
				return (
					<tr>
						<td>{todos.todo}</td>
						<td>
							<input
								type="button"
								className="btn btn btn-outline-secondary"
								onClick={() => this.complete(todos.todo)}
								value="complete"
							/>
						</td>
						<td>
							<TimePicker onChange={(time) => this.TimeChange(time, todos.todo)} value={todos.Alarm} />
							{this.alarm(todos.Alarm, this.state.Ctime)}
						</td>
					</tr>
				);
			}
		});

		return hasilRender;
	};

	render() {
		if (this.props.user_name) {
			return (
				<div className="container mt-5 mb-0">
					<h1>List</h1>
					<div class="card border-2">
						<div class="card-block">
							<table className="table table-sm table-bordered text-center mb-0">
								<tbody>{this.renderTodo()}</tbody>
							</table>
						</div>
					</div>

					<table className="table text-center mt-3">
						<tbody>
							<tr>
								<td>
									<input
										type="text"
										ref={(input) => {
											this.todo = input;
										}}
										className="card form-control"
									/>
								</td>
								<td>
									<input
										type="button"
										className="btn btn-outline-primary form mb-1"
										value="add"
										onClick={this.addTodo}
									/>
								</td>
							</tr>
						</tbody>
					</table>
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
		user_id: state.auth.id,
		user_name: state.auth.username
	};
};

export default connect(mapStateToProps)(todoList);
