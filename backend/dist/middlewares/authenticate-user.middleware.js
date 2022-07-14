"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserMiddleware = void 0;
const common_1 = require("@nestjs/common");
const { verifyJWT } = require('../utils/jwt');
let CurrentUserMiddleware = class CurrentUserMiddleware {
    use(req, res, next) {
        const token = req.signedCookies.token;
        if (!token)
            return next();
        try {
            const { userId, isAdmin } = verifyJWT(token);
            req.user = { userId, isAdmin };
            next();
        }
        catch (err) {
            next();
        }
    }
};
CurrentUserMiddleware = __decorate([
    (0, common_1.Injectable)()
], CurrentUserMiddleware);
exports.CurrentUserMiddleware = CurrentUserMiddleware;
//# sourceMappingURL=authenticate-user.middleware.js.map