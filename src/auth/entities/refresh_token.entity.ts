import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'refresh_tokens',
})
export class RefreshToken {
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

  constructor(partial: Partial<RefreshToken>) {
    Object.assign(this, partial);
  }
}
