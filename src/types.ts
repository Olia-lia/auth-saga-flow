 export interface ErrorElement{
    message?: string,
    type?: string,
    field?: string
}

export type LoginResponse = {
    accessToken: string,
    accessTokenexpiredIn: number,
    refreshToken: string,
    refreshTokenexpiredIn: number
}

export interface tokenPair {
    accessToken: string | null;
    refreshToken: string | null,
}