import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  Response,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import * as bcrypt from 'bcrypt';

const {
  attachCookieToResponse,
  createTokenUser,
  removeCookie,
} = require('../utils/jwt');

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async register(response: Response, userDto: RegisterUserDto) {
    const users = await this.repo.findBy({ email: userDto.email });
    if (users.length) {
      throw new BadRequestException('Email is already in use');
    }
    const { password } = userDto;
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);

      userDto.password = hash;
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }

    const tokenUser = createTokenUser(userDto);
    attachCookieToResponse(response, tokenUser);

    const user = this.repo.create(userDto);
    return this.repo.save(user);
  }

  async login(response: Response, { username, password }: LoginUserDto) {
    const user = await this.repo.findOneBy({ username });
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokenUser = createTokenUser(user);
    attachCookieToResponse(response, tokenUser);

    return tokenUser;
  }

  logout(response: Response) {
    return removeCookie(response);
  }
}
