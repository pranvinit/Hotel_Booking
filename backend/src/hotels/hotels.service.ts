import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/rooms/entities/room.entity';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { GetHotelDto } from './dtos/get-hotels.dto';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel) private hotelsRepo: Repository<Hotel>,
    @InjectRepository(Room) private roomsRepo: Repository<Room>,
  ) {}

  async findAllHotels(options: GetHotelDto) {
    const { min, max, limit } = options;

    const featured = options.featured ? 'TRUE' : 'FALSE';

    const hotels = await this.hotelsRepo
      .createQueryBuilder()
      .select('*')
      .where('cheapestPrice >= :min', { min })
      .andWhere('cheapestPrice <= :max', { max })
      .andWhere(`featured IS ${featured}`)
      .limit(limit)
      .getRawMany();

    return hotels;
  }

  async findHotel(id: number) {
    const hotel = await this.hotelsRepo.findOneBy({ id });
    if (!hotel) throw new NotFoundException('Hotel not found');
    return hotel;
  }

  async findHotelRooms(id: number) {
    const hotel = await this.hotelsRepo.findOneBy({ id });
    if (!hotel) throw new NotFoundException('Hotel not found');
    const rooms = JSON.parse(hotel.rooms);

    try {
      const list = await Promise.all(
        rooms.map((room: number) => {
          return this.roomsRepo.findOneBy({ id: room });
        }),
      );

      return list;
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async createHotel(hotelDto: CreateHotelDto) {
    const hotel = this.hotelsRepo.create(hotelDto);
    return this.hotelsRepo.save(hotel);
  }

  async updateHotel(id: number, hotelDto: Partial<Hotel>) {
    const hotel = await this.hotelsRepo.findOneBy({ id });
    if (!hotel) throw new NotFoundException('Hotel not found');

    Object.assign(hotel, hotelDto);
    return this.hotelsRepo.save(hotel);
  }

  async deleteHotel(id: number) {
    const hotel = await this.hotelsRepo.findOneBy({ id });
    if (!hotel) throw new NotFoundException('Hotel not found');
    return this.hotelsRepo.remove(hotel);
  }
}
