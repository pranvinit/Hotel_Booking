const jwt = require('jsonwebtoken');
const createTokenUser = (user) => ({
    userId: user.id,
    isAdmin: user.isAdmin,
});
const createJWT = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
};
const verifyJWT = (token) => jwt.verify(token, process.env.JWT_SECRET);
const attachCookieToResponse = (res, user) => {
    const token = createJWT(user);
    const duration = 24 * 60 * 60 * 1000;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + duration),
        signed: true,
    });
};
const removeCookie = (res) => {
    res.cookie('token', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
};
module.exports = {
    attachCookieToResponse,
    createTokenUser,
    verifyJWT,
    removeCookie,
};
//# sourceMappingURL=jwt.js.map