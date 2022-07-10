import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  country: string;

  @IsString()
  @IsOptional()
  img: string;

  @IsString()
  city: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;
}
