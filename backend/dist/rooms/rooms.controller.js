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
exports.RoomsController = void 0;
const common_1 = require("@nestjs/common");
const admin_guard_1 = require("../guards/admin.guard");
const create_room_dto_1 = require("./dtos/create-room.dto");
const rooms_service_1 = require("./rooms.service");
let RoomsController = class RoomsController {
    constructor(roomsService) {
        this.roomsService = roomsService;
    }
    getSingleRoom(roomId) {
        return this.roomsService.findRoom(roomId);
    }
    updateAvailability(roomId, body) {
        return this.roomsService.updateAvailability(roomId, body);
    }
    getAllRooms() {
        return this.roomsService.findAllRooms();
    }
    createRoom(hotelId, body) {
        return this.roomsService.createRoom(hotelId, body);
    }
    updateRoom(roomId, body) {
        return this.roomsService.updateRoom(roomId, body);
    }
    deleteRoom(roomId, hotelId) {
        return this.roomsService.deleteRoom(roomId, hotelId);
    }
};
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "getSingleRoom", null);
__decorate([
    (0, common_1.Patch)('/:id/availability'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('dates')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "updateAvailability", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "getAllRooms", null);
__decorate([
    (0, common_1.Post)('/:id'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "updateRoom", null);
__decorate([
    (0, common_1.Delete)('/:id/:hotelId'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('hotelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], RoomsController.prototype, "deleteRoom", null);
RoomsController = __decorate([
    (0, common_1.Controller)('rooms'),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomsController);
exports.RoomsController = RoomsController;
//# sourceMappingURL=rooms.controller.js.map