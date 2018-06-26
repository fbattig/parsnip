import axios from 'axios';

const API_BASE_URL  ='http://localhost:3001';

export const CALL_API ='CALL_API';

function makeCall({
    endpoint,
    method = 'GET',
    body
}) {

    const url = `${API_BASE_URL}${endpoint}`;
    const params = {
        method: method,
        url,
        data: body,
        headers: {
            'Content=type': 'application/json',
        },
    };

    return axios(params).then(resp => resp).catch(err => err);
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

    return makeCall({
        method: callApi.method, 
        body: callApi.body,
        endpoint: callApi.endpoint,
    })
    .then(
        response => next({
            type: successType,
            payload: response.data,
        }),
        error => next({
            type: fairlureType,
            error: error.message,
        }),
    );
      
};

export default apiMiddleware;
