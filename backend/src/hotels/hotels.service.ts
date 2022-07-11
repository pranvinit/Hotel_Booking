import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelsService {
  constructor(@InjectRepository(Hotel) private repo: Repository<Hotel>) {}

  async createHotel(hotelDto: CreateHotelDto) {
    const hotel = this.repo.create(hotelDto);
    return this.repo.save(hotel);
  }

  async deleteHotel(id: number) {
    const hotel = await this.repo.findOneBy({ id });
    if (!hotel) throw new NotFoundException('Hotel not found');
    return this.repo.remove(hotel);
  }
}
