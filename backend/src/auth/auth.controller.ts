import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() body: RegisterUserDto) {
    return this.authService.createUser(body);
  }

  @Post('/login')
  login(@Body() body: LoginUserDto) {}

  @Get('/logout')
  logout() {}
}
