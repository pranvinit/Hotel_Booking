interface RoomNumbers {
    number: number;
    unavailableDates: Date[];
}
export declare class User {
    id: number;
    title: string;
    price: number;
    maxPeople: number;
    desc: string;
    roomNumbers: RoomNumbers[];
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export {};
