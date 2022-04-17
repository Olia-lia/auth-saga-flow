import {put, takeEvery, call, spawn, takeLatest} from 'redux-saga/effects';
import * as Errors from './errors';
import { iFetch } from './index';
import * as  types from './redux'
import { requestValidToken } from './token';


export function* clientRequestSaga () {
    yield takeLatest(types.FETCH_REQUEST, fetchRequest);
}
 
    
export function* fetchRequest(action: any) {
    yield call(requestValidToken);
    const response: Response = yield call(iFetch, action.endpoint, action.method, action.body, action.options);
    return response
};