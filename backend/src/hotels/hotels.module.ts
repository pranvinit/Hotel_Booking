import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/rooms/entities/room.entity';
import { Hotel } from './entities/hotel.entity';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Room])],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
