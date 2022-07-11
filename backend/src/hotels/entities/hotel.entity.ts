import { Max, Min } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  distance: string;

  @Column({ nullable: true })
  photos: string;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column({ nullable: true })
  @Min(0)
  @Max(5)
  rating: number;

  @Column({ nullable: true, default: '[]' })
  rooms: string;

  @Column()
  cheapestPrice: number;

  @Column({ default: false, nullable: true })
  featured: boolean;
}
