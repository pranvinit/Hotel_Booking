import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/currentUser')
  @UseGuards(AuthGuard)
  getCurrentUser(@Req() request: Request) {
    return this.userService.currentUser(request.user.userId);
  }

  @Get()
  @UseGuards(AdminGuard)
  getAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get('/:id')
  getUser(@Param('id') userId: number) {
    return this.userService.findUser(userId);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') userId: number, @Body() body: Partial<User>) {
    return this.userService.updateUser(userId, body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
