import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenUserDto } from '../users/dtos/token-user.dto';

const { verifyJWT } = require('../utils/jwt');

// for type safety
declare global {
  namespace Express {
    // adds an additional optional user property on Request object
    interface Request {
      user: TokenUserDto;
    }
  }
}

// makes it part of the DI system
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.signedCookies.token;

    if (!token) return next();
    try {
      const { userId, isAdmin } = verifyJWT(token);
      req.user = { userId, isAdmin };
      next();
    } catch (err) {
      next();
    }
  }
}
