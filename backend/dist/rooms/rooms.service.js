"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hotel_entity_1 = require("../hotels/entities/hotel.entity");
const typeorm_2 = require("typeorm");
const room_number_entity_1 = require("./entities/room-number.entity");
const room_entity_1 = require("./entities/room.entity");
let RoomsService = class RoomsService {
    constructor(roomsRepo, roomNumbersRepo, hotelsRepo) {
        this.roomsRepo = roomsRepo;
        this.roomNumbersRepo = roomNumbersRepo;
        this.hotelsRepo = hotelsRepo;
    }
    async findRoom(id) {
        const room = await this.roomsRepo.findOneBy({ id });
        if (!room)
            throw new common_1.NotFoundException('Room not found');
        room.roomNumbers = await this.roomNumbersRepo
            .createQueryBuilder()
            .relation(room_entity_1.Room, 'roomNumbers')
            .of(room)
            .loadMany();
        return room;
    }
    async findAllRooms() {
        const rooms = await this.roomsRepo.find({});
        const RNArray = await Promise.all(rooms.map((room) => {
            return this.roomNumbersRepo
                .createQueryBuilder()
                .relation(room_entity_1.Room, 'roomNumbers')
                .of(room)
                .loadMany();
        }));
        rooms.map((r, i) => (r.roomNumbers = RNArray[i]));
        return rooms;
    }
    async createRoom(hotelId, roomDto) {
        const { roomNumbers } = roomDto, rest = __rest(roomDto, ["roomNumbers"]);
        const room = this.roomsRepo.create(rest);
        try {
            const hotel = await this.hotelsRepo.findOneBy({ id: hotelId });
            if (!hotel)
                throw new common_1.NotFoundException('Hotel not found');
            const savedRoom = await this.roomsRepo.save(room);
            await Promise.all(roomNumbers.map((rn) => {
                rn.unavailableDates = JSON.stringify(rn.unavailableDates);
                rn.room = savedRoom;
                return this.roomNumbersRepo.save(rn);
            }));
            const rooms = JSON.parse(hotel.rooms);
            rooms.push(savedRoom.id);
            hotel.rooms = JSON.stringify(rooms);
            await this.hotelsRepo.save(hotel);
            return savedRoom;
        }
        catch (err) {
            console.log(err);
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async updateAvailability(id, dates) {
        const roomNumber = await this.roomNumbersRepo.findOneBy({ id });
        if (!roomNumber)
            throw new common_1.NotFoundException('Room Number not found');
        const rnDates = JSON.parse(roomNumber.unavailableDates);
        rnDates.push(...dates);
        roomNumber.unavailableDates = JSON.stringify(rnDates);
        return this.roomNumbersRepo.save(roomNumber);
    }
    async updateRoom(id, roomDto) {
        const room = await this.roomsRepo.findOneBy({ id });
        if (!room)
            throw new common_1.NotFoundException('room not found');
        Object.assign(room, roomDto);
        return this.roomsRepo.save(room);
    }
    async deleteRoom(roomId, hotelId) {
        const room = await this.roomsRepo.findOneBy({ id: roomId });
        if (!room)
            throw new common_1.NotFoundException('Room not found');
        const hotel = await this.hotelsRepo.findOneBy({ id: hotelId });
        const rooms = JSON.parse(hotel.rooms);
        const newRooms = rooms.filter((room) => room !== roomId);
        hotel.rooms = JSON.stringify(newRooms);
        await this.hotelsRepo.save(hotel);
        return this.roomsRepo.remove(room);
    }
};
RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __param(1, (0, typeorm_1.InjectRepository)(room_number_entity_1.RoomNumber)),
    __param(2, (0, typeorm_1.InjectRepository)(hotel_entity_1.Hotel)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RoomsService);
exports.RoomsService = RoomsService;
//# sourceMappingURL=rooms.service.js.map