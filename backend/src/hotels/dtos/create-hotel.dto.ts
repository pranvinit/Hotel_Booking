import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateHotelDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  city: string;

  @IsString()
  address: string;

  @IsString()
  distance: string;

  @IsString()
  @IsOptional()
  photos: string;

  @IsString()
  title: string;

  @IsString()
  desc: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  rating: number;

  @IsString()
  @IsOptional()
  rooms: string;

  @IsNumber()
  cheapestPrice: number;

  @IsBoolean()
  @IsOptional()
  featured: boolean;
}
