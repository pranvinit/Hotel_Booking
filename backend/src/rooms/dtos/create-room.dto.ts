import { IsString, IsNumber } from 'class-validator';
// import { RoomNumbers } from '../entities/room.entity';

export class CreateRoomDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsNumber()
  maxPeople: number;

  @IsString()
  desc: string;

  roomNumbers: string;
}
