import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
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

  @Patch('/:id/availability')
  updateAvailability(@Param('id') roomId: number, @Body('dates') body: Date[]) {
    return this.roomsService.updateAvailability(roomId, body);
  }

  @Get()
  @UseGuards(AdminGuard)
  getAllRooms() {
    return this.roomsService.findAllRooms();
  }

  @Post('/:id')
  @UseGuards(AdminGuard)
  createRoom(@Param('id') hotelId: number, @Body() body: CreateRoomDto) {
    return this.roomsService.createRoom(hotelId, body);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  updateRoom(@Param('id') roomId: number, @Body() body: Partial<Room>) {
    return this.roomsService.updateRoom(roomId, body);
  }

  @Delete('/:id/:hotelId')
  @UseGuards(AdminGuard)
  deleteRoom(@Param('id') roomId: number, @Param('hotelId') hotelId: number) {
    return this.roomsService.deleteRoom(roomId, hotelId);
  }
}
