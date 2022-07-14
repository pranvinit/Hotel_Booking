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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomNumber = void 0;
const typeorm_1 = require("typeorm");
const room_entity_1 = require("./room.entity");
let RoomNumber = class RoomNumber {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RoomNumber.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RoomNumber.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '[]' }),
    __metadata("design:type", String)
], RoomNumber.prototype, "unavailableDates", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_entity_1.Room, (room) => room.roomNumbers),
    __metadata("design:type", room_entity_1.Room)
], RoomNumber.prototype, "room", void 0);
RoomNumber = __decorate([
    (0, typeorm_1.Entity)()
], RoomNumber);
exports.RoomNumber = RoomNumber;
//# sourceMappingURL=room-number.entity.js.map