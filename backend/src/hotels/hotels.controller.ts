import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { GetHotelDto } from './dtos/get-hotels.dto';
import { Hotel } from './entities/hotel.entity';
import { HotelsService } from './hotels.service';

@Controller('hotels')
export class HotelsController {
  constructor(private hotelsService: HotelsService) {}

  @Get()
  getAllHotels(@Query() options: GetHotelDto) {
    return this.hotelsService.findAllHotels(options);
  }

  @Get('/:id')
  getHotel(@Param('id') hotelId: number) {
    return this.hotelsService.findHotel(hotelId);
  }

  @Get('/:id/rooms')
  getHotelRooms(@Param('id') hotelId: number) {
    return this.hotelsService.findHotelRooms(hotelId);
  }

  @Post()
  createHotel(@Body() body: CreateHotelDto) {
    return this.hotelsService.createHotel(body);
  }

  @Patch('/:id')
  updateHotel(@Param('id') hotelId: number, @Body() body: Partial<Hotel>) {
    return this.hotelsService.updateHotel(hotelId, body);
  }

  @Delete('/:id')
  deleteHotel(@Param('id') hotelId: number) {
    return this.hotelsService.deleteHotel(hotelId);
  }
}
