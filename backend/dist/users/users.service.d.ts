import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    currentUser(id: number): Promise<User[]>;
    findAllUsers(): Promise<User[]>;
    findUser(id: number): Promise<User>;
    updateUser(id: number, userDto: Partial<User>): Promise<User>;
    deleteUser(id: number): Promise<User>;
}
