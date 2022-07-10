import { Controller, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get('/:id')
  getUser(@Param('id') userId: number) {
    return this.userService.findUser(userId);
  }

  @Patch('/:id')
  updateUser(@Param('id') userId: number, @Body() body: Partial<User>) {
    return this.userService.updateUser(userId, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
