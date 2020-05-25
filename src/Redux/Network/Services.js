import axios from 'axios';
import Config from './Config';

/* **************************\
Function: POST
Explanation:
Call post method from actions with params
in body the post request body should be sent from the actions
in env, the endpoint for the request should be sent
============================

\*************************** */
const successStatusCode = [200, 201, 202, 204];
export function post(action, payload, env, successCallback, errorCallback) {
  return axios
    .post(`${env}${action}`, payload)
    .then(response => {
      if (!successStatusCode.find(statusCode => statusCode === response.status)) {
        errorCallback(response);
      } else {
        successCallback(response);
      }
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 401 || error.response.status === 413) {
          errorCallback(error.response);
        }
      }

      if (error.response) {
        errorCallback(error.response);
      }
      errorCallback(error);
    });
}

export function postMultiPart(action, payload, env, successCallback, errorCallback) {
  return axios
    .post(`${env}${action}`, payload, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => successCallback(response))
    .catch(error => {
      if (error.response) {
        errorCallback(error.response);
      }
      errorCallback(error);
    });
}

/* **************************\
Function: PUT
Explanation:
Call PUT method from actions with params
in body the post request body should be sent from the actions
in endUrl, the endpoint for the request should be sent
============================

\*************************** */

export function put(endUrl, payload, env, successCallback, errorCallback) {
  return axios
    .put(`${Config[`${env}`]}${endUrl}`, payload)
    .then(response => successCallback(response))
    .catch(error => {
      if (error.response) {
        errorCallback(error.response);
      }
      errorCallback(error);
    });
}

/* **************************\
Function: get
Explanation:
Call get method from actions with params
in endUrl, the endpoint for the request should be sent
============================

\*************************** */

export function get(endUrl, payload, env, successCallback, errorCallback) {
  const url = payload ? `${env}${endUrl}${payload}` : `${env}${endUrl}`;
  return axios
    .get(url)
    .then(response => successCallback(response))
    .catch(error => {
      if (error.response) {
        errorCallback(error.response);
      }
      errorCallback(error);
    });
}

/* **************************\
Function: remove
Explanation:
Call remove method from actions with params
in endUrl, the endpoint for the request should be sent
============================

\*************************** */

export function remove(action, payload = {}, env, successCallback, errorCallback) {
  return axios
    .delete(`${env}${action}`, { data: payload })
    .then(response => {
      successCallback(response);
    })
    .catch(error => {
      if (error.response) {
        return errorCallback(error.response);
      }
      return error;
    });
}

/* **************************\
Function: setAuthHeaders
Explanation:
call this method from anywhere to set the authtoken
as header in the API calls
============================

\*************************** */

export function setAuthHeaders(jwttoken) {
  axios.defaults.headers.common = {
    ...axios.defaults.headers.common,
    Authorization: jwttoken,
  };
}
