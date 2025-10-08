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
import { ProductEntity } from '../../products/entities/products.entity';
import { ProductVariantEntity } from '../../product-variants/entities/product-variants.entity';

@Entity({ name: 'product_images' })
export class ProductImageEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  @Expose({ name: 'product_id' })
  @ApiProperty({ example: 1 })
  productId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  @Expose({ name: 'variant_id' })
  @ApiProperty({ example: 1 })
  variantId: number | null;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Expose({ name: 'image_url' })
  @ApiProperty({ example: 'https://example.com/product-image.jpg' })
  imageUrl: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  @Expose({ name: 'is_main' })
  @ApiProperty({ example: false })
  isMain: boolean;

  @CreateDateColumn({ type: 'datetime' })
  @Expose({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @Expose({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @ManyToOne(() => ProductVariantEntity, { nullable: true })
  @JoinColumn({ name: 'variantId' })
  variant: ProductVariantEntity | null;
}
