import { combineReducers } from 'redux';
import initialAppData from './InitialReducer';


const appReducers = combineReducers({
    initialAppData,
});

export default appReducers;