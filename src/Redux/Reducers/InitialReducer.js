import * as ActionTypes from "../ReduxConstants/ServiceActionConstants";


const initialState = {
    env: 'MOCK',
    email: 'test@gmail.com'
};

function initialReducer (state = initialState, action){
    switch(action.type){
        case ActionTypes.SET_ENV: {
            return {
                ...state,
                env : action.data
            };
        }
        default:
            return state;
    }
} 

export default initialReducer;