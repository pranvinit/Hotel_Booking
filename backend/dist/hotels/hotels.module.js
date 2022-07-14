"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const room_number_entity_1 = require("../rooms/entities/room-number.entity");
const room_entity_1 = require("../rooms/entities/room.entity");
const hotel_entity_1 = require("./entities/hotel.entity");
const hotels_controller_1 = require("./hotels.controller");
const hotels_service_1 = require("./hotels.service");
let HotelsModule = class HotelsModule {
};
HotelsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([hotel_entity_1.Hotel, room_entity_1.Room, room_number_entity_1.RoomNumber])],
        controllers: [hotels_controller_1.HotelsController],
        providers: [hotels_service_1.HotelsService],
    })
], HotelsModule);
exports.HotelsModule = HotelsModule;
//# sourceMappingURL=hotels.module.js.map