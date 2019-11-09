import React from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
const url_api = 'http://localhost:2004/';

// membikin function login
export const onLoginClick = (Datausername, Datapassword) => {
	return (dispatch) => {
		let Username = Datausername;
		let Password = Datapassword;

		axios
			.get(url_api + 'authRouter/login', {
				params: {
					username: Username,
					password: Password
				}
			})
			.then((res) => {
				if (res.data.length == 0) {
					swal.fire("username doesn't exist", '', 'error');
				}
				let { id, username } = res.data[0];

				//mengirim data ke localstorage
				localStorage.setItem('userData', JSON.stringify({ id, username }));

				//    mengirim data ke reducer
				dispatch({
					type: 'login_success',
					data: { id, username }
				});
				swal.fire('Logged In', 'click the button to continue', 'success');
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const onRegisterClick = (username, password, email) => {
	return (dispatch) => {
		let dataPassword = password;
		let dataUsername = username;
		let dataEmail = email;

		// mengcheck kalau sudah di verify
		axios
			.get(url_api + `authRouter/checkVerify`, {
				params: {
					isVerified: 1,
					username: dataUsername
				}
			})
			.then((res) => {
				// kalau isverified ada isi
				if (res.data.length) {
					axios
						.get(url_api + 'authRouter/login', {
							username: dataUsername,
							password: dataPassword
						})
						.then((res) => {
							//    memgsimpulkan variable
							let id = res.data.id;
							let username = dataUsername;

							//mengirim data ke localstorage
							localStorage.setItem('userData', JSON.stringify({ id, username }));
							//    mengirim data ke reducer
							dispatch({
								type: 'login_success',
								data: { username, id }
							});
							swal.fire('user made', 'click the button to continue', 'success');
						})
						.catch((err) => {
							console.log(err);
						});
					// kalau email belum terverified
				} else {
					axios
						.get(url_api + `authRouter/login`, {
							params: {
								username: dataUsername
							}
						})
						.then((res) => {
							// kalau ada username yang sama
							if (res.data.length > 0) {
								swal.fire('username taken', 'make a new one', 'error');
							} else {
								axios
									.get(url_api + 'authRouter/login', {
										params: {
											email: dataEmail
										}
									})
									.then((res) => {
										if (res.data.length > 0) {
											swal.fire('Email taken', 'use another', 'error');
										} else {
											axios
												.get(url_api + 'authRouter/sendEmail', {
													params: {
														email: dataEmail,
														username: dataUsername,
														password: dataPassword
													}
												})
												.then((res) => {
													axios.post(url_api + 'authRouter/register', {
														username: dataUsername,
														password: dataPassword,
														email:dataEmail
													});
												});
										}
									});
							}
						});
				}
			});
	};
};

export const Logout = () => {
	// menghapus data di local storage
	localStorage.removeItem('userData');

	return {
		type: 'logout_success'
	};
};
