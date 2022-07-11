import { CreateRoomDto } from './dtos/create-room.dto';
import { RoomsService } from './rooms.service';
export declare class RoomsController {
    private roomsService;
    constructor(roomsService: RoomsService);
    createRoom(hotelId: number, body: CreateRoomDto): Promise<import("./entities/room.entity").Room>;
    getAllRooms(): Promise<import("./entities/room.entity").Room[]>;
    updateAvailability(roomId: number, body: Date[]): void;
    deleteRoom(roomId: number): Promise<import("./entities/room.entity").Room>;
}
