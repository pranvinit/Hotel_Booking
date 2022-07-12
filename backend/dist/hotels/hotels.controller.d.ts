import { CreateHotelDto } from './dtos/create-hotel.dto';
import { GetHotelDto } from './dtos/get-hotels.dto';
import { Hotel } from './entities/hotel.entity';
import { HotelsService } from './hotels.service';
export declare class HotelsController {
    private hotelsService;
    constructor(hotelsService: HotelsService);
    getAllHotels(options: GetHotelDto): Promise<any[]>;
    getHotel(hotelId: number): Promise<Hotel>;
    getHotelRooms(hotelId: number): Promise<any[]>;
    createHotel(body: CreateHotelDto): Promise<Hotel>;
    updateHotel(hotelId: number, body: Partial<Hotel>): Promise<Hotel>;
    deleteHotel(hotelId: number): Promise<Hotel>;
}
