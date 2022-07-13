import { IsString, IsNumber } from 'class-validator';

export class CreateRoomNumberDto {
  @IsNumber()
  number: string;

  @IsString()
  unavailableDates: string;
}
