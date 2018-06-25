import axios from 'axios';

const API_BASE_URL  ='http://localhost:3001';

export const CALL_API ='CALL_API';


function makeCall(endpoint) {

    const url = `${API_BASE_URL}${endpoint}`;

    return axios.get(url)
        .then(resp => {
            return resp;
        })
        .catch(err => {
            return err;
        });
}

const apiMiddleware = store => next => action => {
    const callApi = action[CALL_API];
    if (typeof callApi === 'undefined') {
        return next(action)
    }

    const [requestedStartedType, successType, fairlureType] = callApi.types;
    next({
        type: requestedStartedType
    });

    return makeCall(callApi.endpoint).then (
        response =>
        next ({
            type: successType, 
            payload: response.data,
        }),
        error =>
        next ({
            type: fairlureType,
            error: error.message,
        }),
    );

};

export default apiMiddleware;