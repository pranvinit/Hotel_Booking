import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { HotelsService } from './hotels.service';

@Controller('hotels')
export class HotelsController {
  constructor(private hotelsService: HotelsService) {}

  @Post()
  createHotel(@Body() body: CreateHotelDto) {
    return this.hotelsService.createHotel(body);
  }

  @Delete('/:id')
  deleteHotel(@Param('id') hotelId: number) {
    return this.hotelsService.deleteHotel(hotelId);
  }
}
