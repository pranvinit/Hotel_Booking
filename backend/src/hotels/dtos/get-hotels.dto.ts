import { IsBoolean, IsNumber, IsString } from 'class-validator';

import { Transform } from 'class-transformer';

export class GetHotelDto {
  @IsString()
  city: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  limit: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  min: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  max: number;

  @IsBoolean()
  featured: string;
}
