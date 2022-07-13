import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Room } from './room.entity';

// export interface RoomNumbers {
//   id: number;
//   number: number;
//   unavailableDates: Date[];
// }

@Entity()
export class RoomNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column({ default: '[]' })
  unavailableDates: string;

  @ManyToOne(() => Room, (room) => room.roomNumbers)
  room: Room;
}
