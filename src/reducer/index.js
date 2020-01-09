import { combineReducers } from 'redux';
import { withReduxStateSync } from "redux-state-sync";

const inputState = {
	id: '',
	username: '',
	admin: '',
	transaction: null
};

// action creator
const AuthController = (state = inputState, action) => {
	switch (action.type) {
		// kalau login succes
		case 'login_success':
			return { ...state, username: action.data.username, id: action.data.id };

		// tidak ada break, karena proses reducer akan terhenti
		case 'logout_success':
			return { ...state, username: '', id: '', admin: '' };

		// membuktikan transaction berhasil
		case 'transaction_success':
			return { ...state, transaction: true };

		case 'admin_login':
			return { ...state, admin: action.data.admin, id: action.data.id };

		default:
			return state;
	}
};

// combinereducer - mengabung function2 reducer menjadi satu dan membolehkan, gabung dengan value lain
const reducer = combineReducers({
	auth: AuthController
});

export default withReduxStateSync(reducer);
