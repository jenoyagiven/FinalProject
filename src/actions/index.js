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
					swal.fire("not found", '', 'error');
				} else {
					axios.get(url_api + "authRouter/checkVerify", {
						params:{
							username:Username
						}
					}).then((res) => {
						if(res.data < 0){
							swal.fire("user have not been verified", "", "error")
						}else{
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
					})
	};
};

export const onRegisterClick = (username, password, email) => {
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
											localStorage.setItem('Userdata', JSON.stringify({ id, username }));
										});
								});
						}
					});
			}
		});
};
export const Logout = () => {
	// menghapus data di local storage
	localStorage.removeItem('userData');

	return {
		type: 'logout_success'
	};
};
