import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'colors' })
export class ColorEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  @Expose()
  @ApiProperty({ example: 'Đỏ' })
  name: string;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  @Expose()
  @ApiProperty({ example: 'red' })
  code: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  @Expose({ name: 'hex_code' })
  @ApiProperty({ example: '#FF0000' })
  hexCode: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Expose({ name: 'thumbnail_url' })
  @ApiProperty({ example: 'https://example.com/red-color.jpg' })
  thumbnailUrl: string | null;

  @CreateDateColumn({ type: 'datetime' })
  @Expose()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @Expose()
  @ApiProperty()
  updatedAt: Date;
}
