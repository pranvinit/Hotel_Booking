import { Repository } from 'typeorm';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { Hotel } from './entities/hotel.entity';
export declare class HotelsService {
    private repo;
    constructor(repo: Repository<Hotel>);
    createHotel(hotelDto: CreateHotelDto): Promise<Hotel>;
    deleteHotel(id: number): Promise<Hotel>;
}
