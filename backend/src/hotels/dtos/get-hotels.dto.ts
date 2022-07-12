import { IsBoolean, IsNumber } from 'class-validator';

import { Transform } from 'class-transformer';

export class GetHotelDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  limit: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  min: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  max: number;

  @Transform(({ value }) => {
    return value === 'true' ? true : false;
  })
  @IsBoolean()
  featured: boolean;
}
