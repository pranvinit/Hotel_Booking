import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dtos/create-room.dto';
import { Room } from './entities/room.entity';
export declare class RoomsService {
    private roomsRepo;
    private hotelsRepo;
    constructor(roomsRepo: Repository<Room>, hotelsRepo: Repository<Hotel>);
    findRoom(id: number): Promise<Room>;
    findAllRooms(): Promise<Room[]>;
    createRoom(hotelId: number, roomDto: CreateRoomDto): Promise<Room>;
    updateAvailability(id: number, dates: Date[]): Promise<Room[]>;
    updateRoom(id: number, roomDto: Partial<Room>): Promise<Room>;
    deleteRoom(roomId: number, hotelId: number): Promise<Room>;
}
