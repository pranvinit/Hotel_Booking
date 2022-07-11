"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = void 0;
class AdminGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const currentUser = request.user;
        if (!currentUser)
            return false;
        const { isAdmin } = currentUser;
        return isAdmin;
    }
}
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map