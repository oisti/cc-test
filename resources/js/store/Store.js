import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { persistStore } from 'redux-persist';
import ReduxThunk from 'redux-thunk';

import Auth from './authStore';

const persistStoreReducer = (state = {}, { type, payload = null }) => {
    switch (type) {
        case 'persist/REHYDRATE':
            return (state, payload) => {
                const stateObj = Object.assign({}, state, payload);
                return stateObj;
            }
        default:
            return state;
    }
};

const RootReducer = combineReducers({ Auth, persistStoreReducer });

const store = createStore(
    RootReducer,
    compose(
        applyMiddleware(ReduxThunk),
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

persistStore(store);

export default store;