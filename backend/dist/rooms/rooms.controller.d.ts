import { CreateRoomDto } from './dtos/create-room.dto';
import { Room } from './entities/room.entity';
import { RoomsService } from './rooms.service';
export declare class RoomsController {
    private roomsService;
    constructor(roomsService: RoomsService);
    getSingleRoom(roomId: number): Promise<Room>;
    updateAvailability(roomId: number, body: Date[]): Promise<import("./entities/room-number.entity").RoomNumber>;
    getAllRooms(): Promise<Room[]>;
    createRoom(hotelId: number, body: CreateRoomDto): Promise<Room>;
    updateRoom(roomId: number, body: Partial<Room>): Promise<Room>;
    deleteRoom(roomId: number, hotelId: number): Promise<Room>;
}
