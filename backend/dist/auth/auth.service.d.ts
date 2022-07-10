import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
export declare class AuthService {
    private repo;
    constructor(repo: Repository<User>);
    register(response: Response, userDto: RegisterUserDto): Promise<User>;
    login(response: Response, { username, password }: LoginUserDto): Promise<any>;
    logout(response: Response): any;
}
