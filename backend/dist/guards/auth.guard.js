"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
class AuthGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { user } = request;
        return user;
    }
}
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map