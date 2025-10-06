import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntityWithTimestamps extends BaseEntity {
  @CreateDateColumn({ name: 'createdAt', type: 'datetime', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'datetime', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;
}
