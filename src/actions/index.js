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
				// kalau tidak ada hasil
				if (res.data.length == 0) {
					// megcheck kalau input  adalah untuk admin
					axios
						.get(url_api + 'authRouter/loginAdmin', {
							params: {
								admin: Username,
								password: Password
							}
						})
						.then((res) => {
							let { id, admin } = res.data[0];
							//mengirim data ke localstorage
							localStorage.setItem('adminData', JSON.stringify({ id, admin }));

							//    mengirim data ke reducer
							dispatch({
								type: 'admin_login',
								data: { id, admin }
							});
							swal.fire('Logged In', 'click the button to continue', 'success');
						})
						.catch((err) => {
							console.log(err);
							swal.fire('not found', '', 'error');
						});
				} else {
					axios
						.get(url_api + 'authRouter/checkVerify', {
							params: {
								username: Username
							}
						})
						.then((res) => {
							if (res.data < 0) {
								swal.fire('user have not been verified', 'go to mail', 'error');
							} else {
								let { id, username } = res.data[0];

								//mengirim data ke localstorage
								localStorage.setItem('userData', JSON.stringify({ id, username }));

								//    mengirim data ke reducer
								dispatch({
									type: 'login_success',
									data: { id, username }
								});
								swal.fire('Logged In', 'click the button to continue', 'success');
							}
						})
						.catch((err) => {
							console.log(err);
						});
				}
			});
	};
};

// ngesend data ke database
export const paymentSend = (paymentProof, PaymentOption, creditNumber, securityCode, date, user_id) => {
	return (dispatch) => {
		var data = new FormData();
		data.append('image', paymentProof);
		data.append('option', PaymentOption);
		data.append('creditNumber', creditNumber);
		data.append('securityCode', securityCode);
		data.append('date', date);
		data.append('id', user_id);
		axios
			.patch(url_api + 'authRouter/upload', data, {
				headers: {
					'Content-Type': `multipart/form-data`
				}
			})
			.then((response) => {
				dispatch({
					type: 'transaction_success'
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const verifiedRegister = (user) => {
	return (dispatch) => {
		let username = user.username;
		let id = user.id;
		console.log(username);
		console.log(id);

		localStorage.setItem('userData', JSON.stringify({ id, username }));

		dispatch({
			type: 'login_success',
			data: {
				username:username,
				id: id
			}
		});
	};
};

export const onRegisterClick = (username, password, email) => {
	return (dispatch) => {
		// mensimpulkan data
		let dataPassword = password;
		let dataUsername = username;
		let dataEmail = email;

		axios
			.get(url_api + 'authRouter/checkusername', {
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
						.get(url_api + 'authRouter/checkemail', {
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
											username: dataUsername
										}
									})
									.then((res) => {
										swal.fire('verify', 'pergi ke email untuk verify', 'success');
										axios
											.post(url_api + 'authRouter/register', {
												username: dataUsername,
												password: dataPassword,
												email: dataEmail
											})
											.then((res) => {
												let id = res.data.insertId;
												console.log(id);
												
												localStorage.setItem('Userdata', JSON.stringify({ id, username }));
											})
									});
							}
						});
				}
			});
	};
};

export const Logout = () => {
	return (dispatch) => {
		console.log("test");

		// menghapus data di local storage
		localStorage.removeItem('userData');
		localStorage.removeItem('adminData');

		dispatch({
			type: 'logout_success'
		});
	};
};
