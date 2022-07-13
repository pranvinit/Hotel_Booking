import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dtos/create-room.dto';
import { RoomNumber } from './entities/room-number.entity';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomsRepo: Repository<Room>,
    @InjectRepository(RoomNumber)
    private roomNumbersRepo: Repository<RoomNumber>,
    @InjectRepository(Hotel) private hotelsRepo: Repository<Hotel>,
  ) {}

  async findRoom(id: number) {
    const room = await this.roomsRepo.findOneBy({ id });
    if (!room) throw new NotFoundException('Room not found');

    room.roomNumbers = await this.roomNumbersRepo
      .createQueryBuilder()
      .relation(Room, 'roomNumbers')
      .of(room)
      .loadMany();

    return room;
  }

  async findAllRooms() {
    const rooms = await this.roomsRepo.find({});

    const RNArray = await Promise.all(
      rooms.map((room) => {
        return this.roomNumbersRepo
          .createQueryBuilder()
          .relation(Room, 'roomNumbers')
          .of(room)
          .loadMany();
      }),
    );

    rooms.map((r, i) => (r.roomNumbers = RNArray[i]));

    return rooms;
  }

  async createRoom(hotelId: number, roomDto: CreateRoomDto) {
    const { roomNumbers, ...rest } = roomDto;
    const room = this.roomsRepo.create(rest);

    try {
      const hotel = await this.hotelsRepo.findOneBy({ id: hotelId });
      if (!hotel) throw new NotFoundException('Hotel not found');

      const savedRoom = await this.roomsRepo.save(room);

      // array bypass
      await Promise.all(
        roomNumbers.map((rn: any) => {
          rn.unavailableDates = JSON.stringify(rn.unavailableDates);
          rn.room = savedRoom;
          return this.roomNumbersRepo.save(rn);
        }),
      );

      const rooms = JSON.parse(hotel.rooms);
      rooms.push(savedRoom.id);
      hotel.rooms = JSON.stringify(rooms);
      // end

      await this.hotelsRepo.save(hotel);
      return savedRoom;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async updateAvailability(id: number, dates: Date[]) {
    const roomNumber = await this.roomNumbersRepo.findOneBy({ id });
    if (!roomNumber) throw new NotFoundException('Room Number not found');

    // array bypass
    const rnDates = JSON.parse(roomNumber.unavailableDates);
    rnDates.push(...dates);
    roomNumber.unavailableDates = JSON.stringify(rnDates);
    // end

    return this.roomNumbersRepo.save(roomNumber);
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
