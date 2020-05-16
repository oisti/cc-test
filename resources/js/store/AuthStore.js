export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_CHECK = 'AUTH_CHECK';

const authLogin = (state, payload) => {
	const { api_token, ...user } = payload;
	localStorage.setItem('api_token', api_token);
	localStorage.setItem('user', JSON.stringify(user));
	const stateObj = Object.assign({}, state, {
		isAuthenticated: true,
		user
	});
	return stateObj;
};

const checkAuth = state => {
	const stateObj = Object.assign({}, state, {
		isAuthenticated: !!localStorage.getItem('api_token'),
		user: JSON.parse(localStorage.getItem('user'))
	});
	return stateObj;
};

const initialState = {
	isAuthenticated: false,
	user: {
		id: null,
		name: null,
		email: null
	}
};

const AuthStoreReducer = (state = initialState, { type, payload = null }) => {
	switch (type) {
		case AUTH_LOGIN:
			return authLogin(state, payload);
		case AUTH_CHECK:
			return checkAuth(state);
		default:
			return state;
	}
};

export default AuthStoreReducer;