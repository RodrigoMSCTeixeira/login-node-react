import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  ROLE_ID: string;

  @Column('varchar')
  ROLE_NAME: string;

  @CreateDateColumn()
  CREATED_AT: Date;

  @UpdateDateColumn()
  UPDATED_AT: Date;

  @DeleteDateColumn()
  DELETED_AT: Date;

  @OneToMany(() => User, (user) => user.USER_ID, {
    nullable: true,
  })
  users: User[];
}
