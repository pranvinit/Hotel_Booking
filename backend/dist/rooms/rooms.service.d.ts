import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dtos/create-room.dto';
import { RoomNumber } from './entities/room-number.entity';
import { Room } from './entities/room.entity';
export declare class RoomsService {
    private roomsRepo;
    private roomNumbersRepo;
    private hotelsRepo;
    constructor(roomsRepo: Repository<Room>, roomNumbersRepo: Repository<RoomNumber>, hotelsRepo: Repository<Hotel>);
    findRoom(id: number): Promise<Room>;
    findAllRooms(): Promise<Room[]>;
    createRoom(hotelId: number, roomDto: CreateRoomDto): Promise<Room>;
    updateAvailability(id: number, dates: Date[]): Promise<RoomNumber>;
    updateRoom(id: number, roomDto: Partial<Room>): Promise<Room>;
    deleteRoom(roomId: number, hotelId: number): Promise<Room>;
}
