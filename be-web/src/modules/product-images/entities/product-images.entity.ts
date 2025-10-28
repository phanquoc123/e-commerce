import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductColorEntity } from '../../product-colors/entities/product-colors.entity';

@Entity({ name: 'product_images' })
export class ProductImageEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  @Expose({ name: 'product_color_id' })
  @ApiProperty({ example: 1 })
  productColorId: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Expose({ name: 'image_url' })
  @ApiProperty({ example: 'https://example.com/product-image.jpg' })
  imageUrl: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  @Expose({ name: 'is_main' })
  @ApiProperty({ example: false })
  isMain: boolean;

  @Column({ type: 'int', default: 0 })
  @Expose({ name: 'sort_order' })
  @ApiProperty({ example: 0 })
  sortOrder: number;

  @CreateDateColumn({ type: 'datetime' })
  @Expose({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @Expose({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => ProductColorEntity, (productColor) => productColor.images)
  @JoinColumn({ name: 'productColorId' })
  productColor: ProductColorEntity;
}
