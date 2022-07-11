import { CreateHotelDto } from './dtos/create-hotel.dto';
import { HotelsService } from './hotels.service';
export declare class HotelsController {
    private hotelsService;
    constructor(hotelsService: HotelsService);
    createHotel(body: CreateHotelDto): Promise<import("./entities/hotel.entity").Hotel>;
    deleteHotel(hotelId: number): Promise<import("./entities/hotel.entity").Hotel>;
}
