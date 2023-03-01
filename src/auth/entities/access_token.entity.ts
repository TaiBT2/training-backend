import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'access_tokens',
})
export class AccessToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
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
    Object.assign(this, partial);
  }
}
