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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const room_number_entity_1 = require("../rooms/entities/room-number.entity");
const room_entity_1 = require("../rooms/entities/room.entity");
const typeorm_2 = require("typeorm");
const hotel_entity_1 = require("./entities/hotel.entity");
let HotelsService = class HotelsService {
    constructor(roomsRepo, roomNumbersRepo, hotelsRepo) {
        this.roomsRepo = roomsRepo;
        this.roomNumbersRepo = roomNumbersRepo;
        this.hotelsRepo = hotelsRepo;
    }
    async findAllHotels(options) {
        const { min, max, limit } = options;
        const featured = options.featured ? 'TRUE' : 'FALSE';
        const hotels = await this.hotelsRepo
            .createQueryBuilder()
            .select('*')
            .where('cheapestPrice >= :min', { min })
            .andWhere('cheapestPrice <= :max', { max })
            .andWhere(`featured IS ${featured}`)
            .limit(limit)
            .getRawMany();
        return hotels;
    }
    async findHotel(id) {
        const hotel = await this.hotelsRepo.findOneBy({ id });
        if (!hotel)
            throw new common_1.NotFoundException('Hotel not found');
        return hotel;
    }
    async findHotelRooms(id) {
        const hotel = await this.hotelsRepo.findOneBy({ id });
        if (!hotel)
            throw new common_1.NotFoundException('Hotel not found');
        const rooms = JSON.parse(hotel.rooms);
        try {
            const list = await Promise.all(rooms.map((room) => {
                return this.roomsRepo.findOneBy({ id: room });
            }));
            const RNArray = await Promise.all(list.map((room) => {
                return this.roomNumbersRepo
                    .createQueryBuilder()
                    .relation(room_entity_1.Room, 'roomNumbers')
                    .of(room)
                    .loadMany();
            }));
            list.map((r, i) => (r.roomNumbers = RNArray[i]));
            return list;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async createHotel(hotelDto) {
        const hotel = this.hotelsRepo.create(hotelDto);
        return this.hotelsRepo.save(hotel);
    }
    async updateHotel(id, hotelDto) {
        const hotel = await this.hotelsRepo.findOneBy({ id });
        if (!hotel)
            throw new common_1.NotFoundException('Hotel not found');
        Object.assign(hotel, hotelDto);
        return this.hotelsRepo.save(hotel);
    }
    async deleteHotel(id) {
        const hotel = await this.hotelsRepo.findOneBy({ id });
        if (!hotel)
            throw new common_1.NotFoundException('Hotel not found');
        return this.hotelsRepo.remove(hotel);
    }
    async getCountByType() {
        const types = ['Hotel', 'Apartment', 'Resort', 'Villa', 'Cabin'];
        try {
            const list = await Promise.all(types.map((type) => {
                return this.hotelsRepo
                    .createQueryBuilder()
                    .select('COUNT(*)', 'count')
                    .where('type = :type', { type })
                    .getRawOne();
            }));
            const listArr = list.map((item, i) => (Object.assign(Object.assign({}, item), { type: types[i] })));
            return listArr;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async getHotelCountByCity(cities) {
        const cityArray = cities.split(',');
        try {
            const list = await Promise.all(cityArray.map((city) => {
                return this.hotelsRepo
                    .createQueryBuilder()
                    .select('COUNT(*)', 'count')
                    .where('city = :city', { city })
                    .getRawOne();
            }));
            const listArr = list.map((i) => i.count);
            return listArr;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
};
HotelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __param(1, (0, typeorm_1.InjectRepository)(room_number_entity_1.RoomNumber)),
    __param(2, (0, typeorm_1.InjectRepository)(hotel_entity_1.Hotel)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], HotelsService);
exports.HotelsService = HotelsService;
//# sourceMappingURL=hotels.service.js.map