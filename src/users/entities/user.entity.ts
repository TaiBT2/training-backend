import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  DeleteDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { DATABASE_NAMES } from '../../constants';
import * as moment from 'moment';

@Entity({
  name: DATABASE_NAMES.USERS,
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    nullable: true,
    unique: true,
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('text', { nullable: true, default: '' })
  avatar: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  dob: Date;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Expose()
  get age(): number | null {
    if (!this.dob) return null;
    return moment().diff(moment(this.dob), 'year', false);
  }

  @Exclude()
  @Expose()
  get sortKeys(): string[] {
    return [
      'id',
      'username',
      'email',
      'firstName',
      'lastName',
      'createdAt',
      'age',
      'dob',
    ];
  }

  @Exclude()
  @Expose()
  get transformSortKeys(): any {
    return {
      age: () => 'dob',
    };
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  isCorrectPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
