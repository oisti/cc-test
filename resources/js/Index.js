import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline} from '@material-ui/core';
import { Provider, connect } from 'react-redux';
import { AUTH_CHECK } from './store/authStore';

import store from './store/store';
import theme from './theme';

import Auth from './screens/auth/auth';
import Products from './screens/products/products';

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated
});

const PrivateRoute =  connect(mapStateToProps)(({ component: Component, isAuthenticated, ...rest }) => (
    <Route 
        {...rest} 
        render={props =>
            isAuthenticated ? 
                <Component {...props} />
            : 
                <Redirect to={{ pathname: '/login',  state: { from: props.location }}} />
    }
    />
));

store.dispatch({type: AUTH_CHECK});

function Index() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Switch>
                        <Route path="/login" exact component={Auth}/>
                        <PrivateRoute path="/:category?" component={Products}/>
                    </Switch>
                </Router>
            </ThemeProvider>
        </Provider>
    );
}

export default Index;

if (document.getElementById('main')) {
    ReactDOM.render(<Index />, document.getElementById('main'));
}
