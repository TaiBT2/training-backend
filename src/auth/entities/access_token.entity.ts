import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({
  name: 'access_tokens',
})
export class AccessToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @Column('varchar', { default: '', nullable: true })
  host: string;

  @Column('varchar', { default: '', nullable: true })
  device: string;

  @Column('boolean', { default: true })
  isActive: boolean;

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

  constructor(partial: Partial<AccessToken>) {
    super();
    Object.assign(this, partial);
  }
}
