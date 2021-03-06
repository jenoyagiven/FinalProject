import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Logout } from '../actions/index';
import { Link } from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavLink,
	NavItem,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Text
} from 'reactstrap';
import profile from '../Image/user.png';

class header extends Component {
	state = {
		isOpen: false
	};

	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		if (!this.props.user_id) {
			return (
				<div>
					<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
						<a className="navbar-brand">
							<font color="white">FOLLOW</font>
						</a>
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<NavLink href="/register">
										<button type="button" class="btn btn-outline-light">
											Register
										</button>
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="/login">
										<button type="button" class="ml-3 btn btn-outline-light">
											Login
										</button>
									</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</nav>
				</div>
			);
		} else {
			return (
				<div>
					<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
						<a className="navbar-brand">
							<font color="white">FOLLOW</font>
						</a>

						<Nav className="ml-auto">
							<NavItem>
								<NavLink href="/subscription">
									<font color="white">subscription</font>
								</NavLink>
							</NavItem>

							{/* DROPDOWN */}
							<Dropdown toggle={this.toggle} direction="down" isOpen={this.state.isOpen}>
								<DropdownToggle color="">
									<img src={profile} width="30" height="30" />
								</DropdownToggle>

								<DropdownMenu right>
									<DropdownItem className="text-center" disabled>
										<img src={profile} width="50" height="50" />
									</DropdownItem>

									<DropdownItem className="text-center" disabled>
										{this.props.user_name}
									</DropdownItem>

									<DropdownItem className="text-center">
										<NavItem>
											<NavLink href="/profile">
												<button className="btn btn-outline-info">my profile</button>
											</NavLink>
										</NavItem>
									</DropdownItem>

									<DropdownItem divider />

									{/* Actions */}
									<DropdownItem>
										<NavItem>
											<NavLink href="/">
												<button type="button" class="btn btn-outline-info">
													todoList
												</button>
											</NavLink>
										</NavItem>
									</DropdownItem>

									<DropdownItem>
										<NavItem>
											<NavLink href="/login">
												<button
													type="button"
													onClick={this.props.Logout}
													class="btn btn-outline-danger"
												>
													Logout
												</button>
											</NavLink>
										</NavItem>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</Nav>
					</nav>
				</div>
			);
		}
	}
}

const mstp = (state) => {
	return {
		user_id: state.auth.id
	};
};

export default connect(mstp, { Logout })(header);
