import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { GetHotelDto } from './dtos/get-hotels.dto';
import { Hotel } from './entities/hotel.entity';
import { HotelsService } from './hotels.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './validators/file.validator';

@Controller('hotels')
export class HotelsController {
  constructor(private hotelsService: HotelsService) {}

  @Get()
  getAllHotels(@Query() options: Partial<GetHotelDto>) {
    return this.hotelsService.findAllHotels(options);
  }

  @Get('/countByCity')
  countByCity(@Query('cities') cities: string) {
    return this.hotelsService.getHotelCountByCity(cities);
  }

  @Get('/countByType')
  countByType() {
    return this.hotelsService.getCountByType();
  }

  @Get('/:id')
  getHotel(@Param('id') hotelId: number) {
    return this.hotelsService.findHotel(hotelId);
  }

  @Get('/:id/rooms')
  getHotelRooms(@Param('id') hotelId: number) {
    return this.hotelsService.findHotelRooms(hotelId);
  }

  @Post('/uploadMedia')
  @UseInterceptors(FilesInterceptor('images', 6, multerOptions))
  uploadMedia(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.hotelsService.upload(files);
  }

  @Post()
  @UseGuards(AdminGuard)
  createHotel(@Body() body: CreateHotelDto) {
    return this.hotelsService.createHotel(body);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  updateHotel(@Param('id') hotelId: number, @Body() body: Partial<Hotel>) {
    return this.hotelsService.updateHotel(hotelId, body);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  deleteHotel(@Param('id') hotelId: number) {
    return this.hotelsService.deleteHotel(hotelId);
  }
}
