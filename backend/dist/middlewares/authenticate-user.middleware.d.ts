import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenUserDto } from '../users/dtos/token-user.dto';
declare global {
    namespace Express {
        interface Request {
            user: TokenUserDto;
        }
    }
}
export declare class CurrentUserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
