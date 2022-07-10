import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  img: string;

  @Column()
  city: string;

  @Column()
  password: string;

  @Column({ default: false, nullable: true })
  isAdmin: boolean;
}
