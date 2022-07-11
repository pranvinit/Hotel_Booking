import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Room } from './entities/room.entity';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Hotel])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
