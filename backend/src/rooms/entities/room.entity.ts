import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// export interface RoomNumbers {
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

  @Column({ nullable: true })
  roomNumbers: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
