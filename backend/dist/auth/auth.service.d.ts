import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dtos/register-user.dto';
export declare class AuthService {
    private repo;
    constructor(repo: Repository<User>);
    createUser(userDto: RegisterUserDto): Promise<User[]>;
}
