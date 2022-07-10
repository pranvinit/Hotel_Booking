declare const jwt: any;
declare const createTokenUser: (user: any) => {
    userId: any;
    isAdmin: any;
};
declare const createJWT: (payload: any) => any;
declare const verifyJWT: (token: any) => any;
declare const attachCookieToResponse: (res: any, user: any) => void;
declare const removeCookie: (res: any) => void;
