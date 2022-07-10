import { Controller, Post, Get, Body, Res, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  createUser(
    @Res({ passthrough: true }) response: Response,
    @Body() body: RegisterUserDto,
  ) {
    return this.authService.register(response, body);
  }

  @Post('/login')
  login(
    @Res({ passthrough: true }) response: Response,
    @Body() body: LoginUserDto,
  ) {
    return this.authService.login(response, body);
  }

  @Get('/logout')
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
