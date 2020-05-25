import Config from './Config';
import { post, setAuthHeaders } from '../Network/Services';
import * as ActionTypes from '../ReduxConstants/ServiceActionConstants';

/* **************************\
Function: makeRequest
Explanation:
Making Request for the given type
Type will identify the end url based on the env
will have success and failure callback to handle the respective actions
\*************************** */


const makeApiRequest = function makeApiRequest(
  type,
  payload,
  env,
  successCallBack,
  errorCallback,
) {
  // const endPointURL = Config.DEV;

  switch (type) {
    case ActionTypes.SET_ENV:
      setAuthHeaders(payload);
      break;
    case ActionTypes.GET_CUSTOMER_PROFILE:
      post(Config.devEnvironment, payload, endPointURL.devEnvironment, successCallBack, errorCallback);
      break;
    default:
      break;
  }
};

export default makeApiRequest;
