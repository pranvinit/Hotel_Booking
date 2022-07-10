import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  getAllUsers() {}

  @Get('/:id')
  getUser(@Param('id') userId: string) {}

  @Patch('/:id')
  updateUser(@Param('id') userId: string, @Body() body: UpdateUserDto) {}

  @Delete('/:id')
  deleteUser(@Param('id') userId: string) {}
}
