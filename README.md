# Module description
The module is designed to implement flow authentication. Stack: react redux redux-saga.

## Installation 
Download and install Node:
```
https://nodejs.org
```
Install packages:
```
react
redux
reux saga
```
Download module: 
```
npm install auth-saga-flow
```

### Valiables 
```
accessToken 
refreshToken
accessTokenExpiredIn - the time when the acessToken expires
refreshTokenExpiredIn - the time when the refreshToken expires
For this flow it needed to separate tokens and expires times for store it in localstorage
```

## Methods
``` 
iFetch(url, method, body?, {options}) - method for REST API requests, wrapper fot native fetch method.

url - api adress 
method - method of REST API request
body - optional parameter
options - optional parameter, default is an empty object.
Example: iFetch('http://localhost:4200/login', 'POST', body, {credentials:'same-origin'})
```
Import method:
```
import {iFetch} from 'redux-saga-flow'
```   

### Saga methods 

fetchRequest({url, method, body?, {options}}) - function-generator, that implements a request to the server.
import method
```
import {fetchRequest} from 'auth-saga-flow/lib/sagas';
```

For using this method a function in client code it necessary set tracking function, Client can import the default action FETCH_REQUEST.
```
import {FETCH_REQUEST} from 'auth-saga-flow/lib/redux'
```
```
export default function* clientRequestSagaWatcher () {
    yield takeEvery(FETCH_REQUEST, fetchRequest);
}
```
Example in Clien Code: 
```
function* getUsers() {
    try{
        const response= yield call(fetchRequest, {url: `${BASE_URL}/${endpoint}`, method: 'GET'});
        yield put ({type: USERS_SUCCEEDED, payload: response});
    }
      catch(error) {
        yield put({type: USERS_FAILED, payload:error})
        yield put({type: HANDLE_ERROR, payload: error});
    }
}
```
To send multiple requests, it is recommended to use the non-blocking effects of redux-saga
Example in Client code: 
```
function* fetchRequests() {
    yield fork(getUsers);
    yield fork(getAvatars);
    yield fork(getComments);
    yield fork(getMessage);
}
the saga-watcher function in this case would look like this: 
export default function* clientRequestSagaWatcher () {
    yield takeLatest(FETCH_REQUESTS, fetchRequests);
    yield takeEvery(FETCH_REQUEST, fetchRequest);
}
```
```
##Redux 
```
### Redux Actions 
```
REFRESH_TOKEN 
The client needs to implement the REFRESH_TOKEN function, that return a new token pair, and put it to Sagawatcher. 
Example:
const BASE_URL = 'http//localhost:3000'

const refreshNewToken = () => {
    const endpoint = 'auth/refresh_token';
    const token = localStorage.getItem('refreshToken');
  
    const data: RefreshTokenRequest = {
        grant_type: 'refresh_token',
        refreshToken: token
    };
    const response: types.LoginResponse = fetchRequest(`${BASE_URL}/${endpoint}`, 'POST',  data);
    return response;
};


function* refreshNewTokenSagaWorker(action) {
    const response: LoginResponse = yield call(refreshNewToken, action.payload)

    if(response) {
        yield put ({type: SET_TOKENS, payload: response}); 
    }
}

Action SET_TOKEN in this case is recommended name for action that dispatch a method of saving tokens. Еhe method that implements the saving of tokens must be imported from the library (setToken)

function* SagaWatcher ={
    yield takeEvery(REFRESH_TOKEN, refreshNewTokenSagaWorker);
} 
``````
Methods setTokens and logout
```
Method setTokens methods implements savind tokens in localStostorage. Method logout clears localstorage from tokens. 

Example login flow in client code:


export default function* authSagaWatchers () {
    yield takeEvery(LOGIN_REQUEST, loginSaga);
    yield takeEvery(LOGOUT, logoutSaga);
    yield takeEvery(SET_TOKENS, setTokensSaga);
} 


export function* setTokensSaga(action) {
    yield call(setTokens, action.payload)
}

function* loginSaga(action: any) { 
 
    try {
        const response: LoginResponse = yield call(login, action.credentials);
      
        if(response) {
            yield put ({type: SET_TOKENS, payload: response}); 
            yield put({type: LOGIN_REQUEST_SUCCEEDED, response});
        }
    }
    catch(error) {
        yield put({type: HANDLE_ERROR, payload: error}); //examle of error handler below
    }
}

function* logoutSaga(action: any) {
    try {
        yield call(logout);
        yield put({type: RESET_LOGIN_STATE});
      
    }
    catch(error) {
        yield put({type: HANDLE_ERROR, payload: error});
    }
}

## Errors 
```
For import error types: 
import {UnathorizedError, ValidationError, ModalError} from '????/lib/errors'
```
### Error Types
```
ValidationError (BadRequest) - form validation error, that comes from the server with status 400. 
Example: {"message":"validationError","errors":[{"field":"username","type":"required","message":"required field"},{"field":"password","type":"required","message":"required field"}]}
ModalError - error that should be shown to the user
UnathorizedError (401)
RedirectError
```

Example of Client Code: 

export default function* errorSaga () {
    yield takeEvery(HANDLE_ERROR, errorHandlerSaga);
 
} 

function* errorHandlerSaga (action) {
    console.log(action.payload.errors);
    if (action.payload instanceof Errors.ValidationError) {
        yield put({type: LOGIN_REQUEST_FAILED, payload: action.payload});
    }
    else if (action.payload instanceof Errors.ModalError) {
        yield put ({type: SET_PAGE_ERROR, payload: action.payload});
    }
    else if (action.payload instanceof Errors.UnauthorizedError) {
        yield put({type: LOGOUT});
    }
}


example of configuration file:
```
ACCESS_SECRET_KEY=<your secret key here>
REFRESH_SECRET_KEY
PORT
HOST
BASE_URL
CLIENT_URL
```




