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
exports.HotelsController = void 0;
const common_1 = require("@nestjs/common");
const admin_guard_1 = require("../guards/admin.guard");
const create_hotel_dto_1 = require("./dtos/create-hotel.dto");
const get_hotels_dto_1 = require("./dtos/get-hotels.dto");
const hotels_service_1 = require("./hotels.service");
let HotelsController = class HotelsController {
    constructor(hotelsService) {
        this.hotelsService = hotelsService;
    }
    getAllHotels(options) {
        return this.hotelsService.findAllHotels(options);
    }
    countByCity(cities) {
        return this.hotelsService.getHotelCountByCity(cities);
    }
    countByType() {
        return this.hotelsService.getCountByType();
    }
    getHotel(hotelId) {
        return this.hotelsService.findHotel(hotelId);
    }
    getHotelRooms(hotelId) {
        return this.hotelsService.findHotelRooms(hotelId);
    }
    createHotel(body) {
        return this.hotelsService.createHotel(body);
    }
    updateHotel(hotelId, body) {
        return this.hotelsService.updateHotel(hotelId, body);
    }
    deleteHotel(hotelId) {
        return this.hotelsService.deleteHotel(hotelId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_hotels_dto_1.GetHotelDto]),
    __metadata("design:returntype", void 0)
], HotelsController.prototype, "getAllHotels", null);
__decorate([
    (0, common_1.Get)('/countByCity'),
    __param(0, (0, common_1.Query)('cities')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HotelsController.prototype, "countByCity", null);
__decorate([
    (0, common_1.Get)('/countByType'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HotelsController.prototype, "countByType", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HotelsController.prototype, "getHotel", null);
__decorate([
    (0, common_1.Get)('/:id/rooms'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HotelsController.prototype, "getHotelRooms", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hotel_dto_1.CreateHotelDto]),
    __metadata("design:returntype", void 0)
], HotelsController.prototype, "createHotel", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], HotelsController.prototype, "updateHotel", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HotelsController.prototype, "deleteHotel", null);
HotelsController = __decorate([
    (0, common_1.Controller)('hotels'),
    __metadata("design:paramtypes", [hotels_service_1.HotelsService])
], HotelsController);
exports.HotelsController = HotelsController;
//# sourceMappingURL=hotels.controller.js.map