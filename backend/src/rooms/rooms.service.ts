import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dtos/create-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomsRepo: Repository<Room>,
    @InjectRepository(Hotel) private hotelsRepo: Repository<Hotel>,
  ) {}

  async findAllRooms() {
    const rooms = await this.roomsRepo.find({});
    return rooms;
  }

  async createRoom(hotelId: number, roomDto: CreateRoomDto) {
    const room = this.roomsRepo.create(roomDto);
    try {
      const hotel = await this.hotelsRepo.findOneBy({ id: hotelId });
      if (!hotel) throw new NotFoundException('Hotel not found');

      const savedRoom = await this.roomsRepo.save(room);

      // array bypass
      const rooms = JSON.parse(hotel.rooms);
      rooms.push(savedRoom.id);
      hotel.rooms = JSON.stringify(rooms);
      //end

      console.log(hotel);
      await this.hotelsRepo.save(hotel);
      return savedRoom;
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async updateAvailability(id: number, dates: Date[]) {
    const room = await this.roomsRepo.findOneBy({ id });
    if (!room) throw new NotFoundException('Room not found');
  }

  async deleteRoom(id: number) {
    const room = await this.roomsRepo.findOneBy({ id });
    if (!room) throw new NotFoundException('Room not found');
    return this.roomsRepo.remove(room);
  }
}
