import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { RoomNumber } from './room-number.entity';

// export interface RoomNumbers {
//   id: number;
//   number: number;
//   unavailableDates: Date[];
// }

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  maxPeople: number;

  @Column()
  desc: string;

  @OneToMany(() => RoomNumber, (roomNumber) => roomNumber.room, {
    cascade: true,
  })
  roomNumbers: RoomNumber[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
