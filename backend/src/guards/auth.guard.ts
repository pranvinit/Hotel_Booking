import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    // Only calls the next handler if userId is truthy otherwise throws an exception
    return user;
  }
}
