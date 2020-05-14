//import http from '../../http';

const AUTH_LOGIN = 'AUTH_LOGIN';
const AUTH_CHECK = 'AUTH_CHECK';

const authLogin = (state, payload) => {
    const { access_token: AccessToken, user } = payload;
    localStorage.setItem('access_token', AccessToken);
    localStorage.setItem('user', JSON.stringify(user));
    //http.defaults.headers.common.Authorization = 'Bearer ${AccessToken}';
    const stateObj = Object.assign({}, state, {
      isAuthenticated: true,
      user
    });
    return stateObj;
};
  
const checkAuth = state => {
    const stateObj = Object.assign({}, state, {
      isAuthenticated: !!localStorage.getItem('access_token'),
      user: JSON.parse(localStorage.getItem('user'))
    });
    if (state.isAuthenticated) {
      //http.defaults.headers.common.Authorization = "Bearer ${localStorage.getItem('access_token')}";
    }
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