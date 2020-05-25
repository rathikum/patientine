import makeApiRequest from "../Network/ApiInterface";
import * as ActionTypes from "../ReduxConstants/ServiceActionConstants";

/* **************************\
Function: setJWTToken().
Explanation:
This function will set the token received
from the login API which is required for all other API calls
It method doesn't require any callback, so it is kept as null
============================

\************************** */

export const setJWTToken = data => () => {
  makeApiRequest(ActionTypes.SET_JWT_TOKEN, data, null, null, null);
};