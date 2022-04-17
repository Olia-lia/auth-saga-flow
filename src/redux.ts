import { LoginResponse } from "./types";

///auth actions
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKENS = 'SET_TOKENS';

///client actions
export const GET_TOKEN = 'GET_TOKEN';
export const FETCH_REQUEST = 'FETCH_REQUEST';


export const logOut = () => {
    return {
        type: LOGOUT
    };
};


export interface RefreshToken {
    type: typeof REFRESH_TOKEN,
    payload: string,
}

export const refreshNewToken = (refreshToken: string) => {
    return {
        type: REFRESH_TOKEN,
        payload: refreshToken
    };
};

export const setTokens = (data: LoginResponse) => {
    return {
        type: SET_TOKENS,
        payload: data
    };
}; 

export const fetchRequest = (url: string, method: string, body?: any, options: any) => {
    return {
        type: FETCH_REQUEST,
        url,
        method, 
        body,
        options
    };
};

export const getToken = () => {
    return {
        type: GET_TOKEN,
    };
};

