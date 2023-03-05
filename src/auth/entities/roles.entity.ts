import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToMany,
  DeleteDateColumn,
  JoinTable,
} from 'typeorm';
import { Permission } from './permissions.entity';

@Entity({
  name: 'access_tokens',
})
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('longtext', { default: '', nullable: true })
  description: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  createdAt: number;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updatedAt: number;

  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;

  constructor(partial: Partial<Role>) {
    super();
    Object.assign(this, partial);
  }
}
