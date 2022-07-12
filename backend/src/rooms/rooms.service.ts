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

  async findRoom(id: number) {
    const room = await this.roomsRepo.findOneBy({ id });
    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

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

      await this.hotelsRepo.save(hotel);
      return savedRoom;
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async updateAvailability(id: number, dates: Date[]) {
    const room = await this.roomsRepo.find({});
    if (!room) throw new NotFoundException('Room not found');

    // array bypass
    // const roomNumbers = JSON.parse(room.roomNumbers);
    // roomNumbers.push(...dates);
    // room.roomNumbers = roomNumbers;
    // end

    return this.roomsRepo.save(room);
  }

  async updateRoom(id: number, roomDto: Partial<Room>) {
    const room = await this.roomsRepo.findOneBy({ id });
    if (!room) throw new NotFoundException('room not found');

    Object.assign(room, roomDto);
    return this.roomsRepo.save(room);
  }

  async deleteRoom(roomId: number, hotelId: number) {
    const room = await this.roomsRepo.findOneBy({ id: roomId });
    if (!room) throw new NotFoundException('Room not found');

    const hotel = await this.hotelsRepo.findOneBy({ id: hotelId });

    // array bypass
    const rooms = JSON.parse(hotel.rooms);
    const newRooms = rooms.filter((room: number) => room !== roomId);
    hotel.rooms = JSON.stringify(newRooms);
    //end
    await this.hotelsRepo.save(hotel);

    return this.roomsRepo.remove(room);
  }
}
