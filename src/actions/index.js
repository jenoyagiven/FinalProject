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
					password: Password,
				}
			})
			.then((res) => {
                if(res.data.length === 0){
                    swal.fire('username doesn\'t exist', '', 'error');
                }
				let { idlist_user, name } = res.data[0];
				console.log(res.data);

				//mengirim data ke localstorage
				localStorage.setItem(
					"userData",
					JSON.stringify({ idlist_user, name })
				) 
				
				//    mengirim data ke reducer
				dispatch({
					type: 'login_success',
					data: { idlist_user, name }
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
		let dataEmail = email
        
        axios.get(url_api + `authRouter/login`, {
            params:{
				username:dataUsername,
				email:dataEmail
            }
        }).then((res) => {			
			console.log(res.data);
			
            // kalau ada username yang sama
            if(res.data.length > 0){
                swal.fire('username taken', 'make a new one', 'error');
			}else{
                axios
			.post(url_api + 'authRouter/register', {
				username: dataUsername,
				password: dataPassword,
				email:dataEmail
			})
			.then((res) => {
				swal.fire(
					'Good job!',
					'You clicked the button!',
					'success'
				  )

				//    memgsimpulkan variqable
				let name = dataUsername
				let idlist_user = res.data.insertId
				//mengirim data ke localstorage
				localStorage.setItem(
					"userData",
					JSON.stringify({idlist_user, name})
				)


				//    mengirim data ke reducer
				dispatch({
					type: 'login_success',
					data: { name, idlist_user}
				});
				swal.fire('user made', 'click the button to continue', 'success');
			})
			.catch((err) => {
				console.log("fail");
				console.log(err);
			});
            }
        })
	};
};

export const Logout = () => {
    // menghapus data di local storage
	localStorage.removeItem("userData")

	return {
		type: 'logout_success'
	};
};
