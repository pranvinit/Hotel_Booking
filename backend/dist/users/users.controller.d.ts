import { UpdateUserDto } from './dtos/update-user.dto';
export declare class UsersController {
    getAllUsers(): void;
    getUser(userId: string): void;
    updateUser(userId: string, body: UpdateUserDto): void;
    deleteUser(userId: string): void;
}
