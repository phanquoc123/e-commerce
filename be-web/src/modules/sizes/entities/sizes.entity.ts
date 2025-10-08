import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'sizes' })
export class SizeEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  @Expose()
  @ApiProperty({ example: 'M' })
  name: string;

  @CreateDateColumn({ type: 'datetime' })
  @Expose()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @Expose()
  @ApiProperty()
  updatedAt: Date;
}
