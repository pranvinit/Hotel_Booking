"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const rooms_module_1 = require("./rooms/rooms.module");
const hotels_module_1 = require("./hotels/hotels.module");
const auth_module_1 = require("./auth/auth.module");
const user_entity_1 = require("./users/entities/user.entity");
const authenticate_user_middleware_1 = require("./middlewares/authenticate-user.middleware");
const room_entity_1 = require("./rooms/entities/room.entity");
const hotel_entity_1 = require("./hotels/entities/hotel.entity");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(authenticate_user_middleware_1.CurrentUserMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'booking.sqlite',
                entities: [user_entity_1.User, room_entity_1.Room, hotel_entity_1.Hotel],
                synchronize: true,
            }),
            users_module_1.UsersModule,
            rooms_module_1.RoomsModule,
            hotels_module_1.HotelsModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map