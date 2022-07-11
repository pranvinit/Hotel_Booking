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
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Post('/:id')
  createRoom(@Param('id') hotelId: number, @Body() body: CreateRoomDto) {
    return this.roomsService.createRoom(hotelId, body);
  }

  @Get()
  getAllRooms() {
    return this.roomsService.findAllRooms();
  }

  @Patch()
  updateAvailability(@Param('id') roomId: number, @Body() body: Date[]) {
    // return this.roomsService.updateAvailability()
  }

  @Delete('/:id')
  deleteRoom(@Param('id') roomId: number) {
    return this.roomsService.deleteRoom(roomId);
  }
}
