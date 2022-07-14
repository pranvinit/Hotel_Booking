/// <reference types="multer" />
import { RoomNumber } from 'src/rooms/entities/room-number.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { GetHotelDto } from './dtos/get-hotels.dto';
import { Hotel } from './entities/hotel.entity';
export declare class HotelsService {
    private roomsRepo;
    private roomNumbersRepo;
    private hotelsRepo;
    constructor(roomsRepo: Repository<Room>, roomNumbersRepo: Repository<RoomNumber>, hotelsRepo: Repository<Hotel>);
    findAllHotels(options: Partial<GetHotelDto>): Promise<any[]>;
    findHotel(id: number): Promise<Hotel>;
    findHotelRooms(id: number): Promise<any[]>;
    createHotel(hotelDto: CreateHotelDto): Promise<Hotel>;
    updateHotel(id: number, hotelDto: Partial<Hotel>): Promise<Hotel>;
    deleteHotel(id: number): Promise<Hotel>;
    getCountByType(): Promise<any[]>;
    getHotelCountByCity(cities: string): Promise<any[]>;
    upload(files: Array<Express.Multer.File>): Promise<any[]>;
}
