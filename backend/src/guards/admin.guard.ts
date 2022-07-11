import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const currentUser = request.user;
    if (!currentUser) return false;
    const { isAdmin } = currentUser;

    // Only calls the next handler if userId is truthy otherwise throws an exception
    return isAdmin;
  }
}
