import { RoomNumber } from './room-number.entity';
export declare class Room {
    id: number;
    title: string;
    price: number;
    maxPeople: number;
    desc: string;
    roomNumbers: RoomNumber[];
    createdAt: Date;
    updatedAt: Date;
}
