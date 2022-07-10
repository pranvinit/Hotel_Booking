import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: RegisterUserDto): Promise<import("../users/entities/user.entity").User[]>;
    login(body: LoginUserDto): void;
    logout(): void;
}
