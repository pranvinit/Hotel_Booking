import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  username: string;
  @Expose()
  email: string;
  @Expose()
  img: string;
  @Expose()
  city: string;

  password: string;
  @Expose()
  isAdmin: boolean;
}
