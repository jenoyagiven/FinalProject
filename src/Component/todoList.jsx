import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom"
import {connect} from 'react-redux';
const url_api = 'http://localhost:2004';

class todoList extends Component {
	
	state = {
		data: []
	};

	componentDidMount = () => {
		this.getdata();
	};

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
				iduser:this.props.user_id
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
                console.log('berhasil');
                this.getdata()
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// mengrender todo
	renderTodo = () => {
		let hasilRender = this.state.data.map((todos) => {
			if(todos.iduser == this.props.user_id){
			return (
				<tr>
					<td>{todos.todo}</td>
					<td>
						<input type="button" className="btn btn btn-outline-secondary" onClick={() => this.complete(todos.todo)} value="complete" />
					</td>
				</tr>
			);
		 }
		});

		return hasilRender;
	};

	render() {
		if(this.props.user_name){
		return (
			<div className="container mt-5 ">
				<h1>List</h1>
				<table className="table text-center">
					<tbody>{this.renderTodo()}</tbody>
				</table>

				<table className="table">
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
	}else{
		return <Redirect to="/login"/>
	}
  }
}

// mengambil data dari state reducer
const mapStateToProps = state => {
    return {
		user_id:state.auth.id,
		user_name:state.auth.username
    }
}

export default connect(mapStateToProps)(todoList);
