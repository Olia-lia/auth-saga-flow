import {LoginResponse} from './types';
import {REFRESH_TOKEN, RefreshToken} from './redux';
import {put, call} from 'redux-saga/effects';
import { UnauthorizedError } from './errors';



interface tokenPair {
    accessToken: string | null;
    refreshToken: string | null,
}

class Token   {
    static getToken(): tokenPair{
        return {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
        };
    }

    static isAccessTokenValid(now: number){
        const tokenExpiresStr: string | null  = localStorage.getItem('accessTokenExpiredIn');
        const tokenExpiresDate: number = JSON.parse(tokenExpiresStr);
        return now < tokenExpiresDate;
    }

    static isRefreshTokenValid(now: number) {
        const tokenExpiresStr = localStorage.getItem('refreshTokenExpiredIn');
        const tokenExpiresDate: number = JSON.parse(tokenExpiresStr);
        return now < tokenExpiresDate;
    }
    
}


let refreshTokenRequest: LoginResponse | null = null;

export function* requestValidToken() {
    console.log(refreshTokenRequest);
       let {refreshToken, accessToken} = yield call(Token.getToken);
       const now:number = yield call(Date.now);
       if (refreshToken == null || !(Token.isRefreshTokenValid(now))) {
           throw new UnauthorizedError('token not valid');
       } 
       else if (accessToken == null || !Token.isAccessTokenValid(now)) {
            if (refreshTokenRequest == null) {
               refreshTokenRequest = put({type: REFRESH_TOKEN, payload: refreshToken})
           }
           
           const data:LoginResponse = yield (refreshTokenRequest)
            refreshTokenRequest = null;
            return data.accessToken
     
       }
       return accessToken;
   }
   
