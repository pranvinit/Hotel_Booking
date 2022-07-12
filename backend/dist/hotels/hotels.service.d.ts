import { Room } from 'src/rooms/entities/room.entity';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { GetHotelDto } from './dtos/get-hotels.dto';
import { Hotel } from './entities/hotel.entity';
export declare class HotelsService {
    private hotelsRepo;
    private roomsRepo;
    constructor(hotelsRepo: Repository<Hotel>, roomsRepo: Repository<Room>);
    findAllHotels(options: GetHotelDto): Promise<any[]>;
    findHotel(id: number): Promise<Hotel>;
    findHotelRooms(id: number): Promise<any[]>;
    createHotel(hotelDto: CreateHotelDto): Promise<Hotel>;
    updateHotel(id: number, hotelDto: Partial<Hotel>): Promise<Hotel>;
    deleteHotel(id: number): Promise<Hotel>;
}
