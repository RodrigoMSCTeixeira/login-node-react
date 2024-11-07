import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Role } from './Role';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  USER_ID: string;

  @Column('varchar', { unique: true })
  USERNAME: string;

  @Column('varchar')
  PASSWORD: string;

  @CreateDateColumn()
  CREATED_AT: Date;

  @UpdateDateColumn()
  UPDATED_AT: Date;

  @DeleteDateColumn()
  DELETED_AT: Date;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'ROLE_ID' })
  USER_ROLE: Role;
}
