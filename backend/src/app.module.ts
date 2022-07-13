import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { HotelsModule } from './hotels/hotels.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { CurrentUserMiddleware } from './middlewares/authenticate-user.middleware';
import { Room } from './rooms/entities/room.entity';
import { Hotel } from './hotels/entities/hotel.entity';
import { RoomNumber } from './rooms/entities/room-number.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'booking.sqlite',
      entities: [User, Room, RoomNumber, Hotel],
      // cleans and syncs database on changes
      synchronize: true,
    }),
    UsersModule,
    RoomsModule,
    HotelsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
