import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomNumber } from 'src/rooms/entities/room-number.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { GetHotelDto } from './dtos/get-hotels.dto';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Room) private roomsRepo: Repository<Room>,
    @InjectRepository(RoomNumber)
    private roomNumbersRepo: Repository<RoomNumber>,
    @InjectRepository(Hotel) private hotelsRepo: Repository<Hotel>,
  ) {}

  async findAllHotels(options: Partial<GetHotelDto>) {
    const min = options.min ? options.min : 1;
    const max = options.max ? options.max : 999;

    const hotelsQuery = this.hotelsRepo
      .createQueryBuilder()
      .select('*')
      .where('cheapestPrice >= :min', { min })
      .andWhere('cheapestPrice <= :max', { max });

    if (options.city) {
      hotelsQuery.andWhere('city = :city', { city: options.city });
    }
    if (options.featured) {
      hotelsQuery.andWhere(`featured IS ${options.featured}`);
    }
    if (options.limit) {
      hotelsQuery.limit(options.limit);
    }

    const hotels = await hotelsQuery.getRawMany();

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

      const RNArray = await Promise.all(
        list.map((room) => {
          return this.roomNumbersRepo
            .createQueryBuilder()
            .relation(Room, 'roomNumbers')
            .of(room)
            .loadMany();
        }),
      );

      list.map((r, i) => (r.roomNumbers = RNArray[i]));

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

  async getCountByType() {
    const types = ['Hotel', 'Apartment', 'Resort', 'Villa', 'Cabin'];

    try {
      const list = await Promise.all(
        types.map((type) => {
          return this.hotelsRepo
            .createQueryBuilder()
            .select('COUNT(*)', 'count')
            .where('type = :type', { type })
            .getRawOne();
        }),
      );

      const listArr = list.map((item, i) => ({
        ...item,
        type: types[i] + 's',
      }));
      return listArr;
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getHotelCountByCity(cities: string) {
    const cityArray = cities.split(',');
    try {
      const list = await Promise.all(
        cityArray.map((city) => {
          return this.hotelsRepo
            .createQueryBuilder()
            .select('COUNT(*)', 'count')
            .where('city = :city', { city })
            .getRawOne();
        }),
      );
      const listArr = list.map((i) => i.count);
      return listArr;
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
