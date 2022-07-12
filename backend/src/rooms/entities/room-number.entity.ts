import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

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
  number: number;

  @Column({ default: '[]' })
  unavailableDates: Date[];
}
