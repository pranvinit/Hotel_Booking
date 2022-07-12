import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRoomDto } from './dtos/create-room.dto';
import { Room } from './entities/room.entity';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get('/:id')
  getSingleRoom(@Param('id') roomId: number) {
    return this.roomsService.findRoom(roomId);
  }

  @Get()
  getAllRooms() {
    return this.roomsService.findAllRooms();
  }

  @Post('/:id')
  createRoom(@Param('id') hotelId: number, @Body() body: CreateRoomDto) {
    return this.roomsService.createRoom(hotelId, body);
  }

  @Patch('/:id')
  updateRoom(@Param('id') roomId: number, @Body() body: Partial<Room>) {
    return this.roomsService.updateRoom(roomId, body);
  }

  // @Patch('/:id/availability')
  // updateAvailability(@Param('id') roomId: number, @Body() body: Date[]) {
  //   return this.roomsService.updateAvailability(roomId, body);
  // }

  @Delete('/:id/:hotelId')
  deleteRoom(@Param('id') roomId: number, @Param('hotelId') hotelId: number) {
    return this.roomsService.deleteRoom(roomId, hotelId);
  }
}
