import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Reducers';

const initialState = {
    initialAppData: {
        env: 'MOCK',
        email: 'test@gmail.com',
    },
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
