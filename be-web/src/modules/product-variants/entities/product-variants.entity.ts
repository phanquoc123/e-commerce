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
import { ColorEntity } from '../../colors/entities/colors.entity';
import { SizeEntity } from '../../sizes/entities/sizes.entity';

@Entity({ name: 'product_variants' })
export class ProductVariantEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  @Expose({ name: 'product_id' })
  @ApiProperty({ example: 1 })
  productId: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  @Expose()
  @ApiProperty({ example: 'ATN-RED-M' })
  sku: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @Expose()
  @ApiProperty({ example: 299000 })
  price: number;

  @Column({ type: 'bigint', unsigned: true, default: 0 })
  @Expose()
  @ApiProperty({ example: 100 })
  available: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  @Expose({ name: 'color_id' })
  @ApiProperty({ example: 1 })
  colorId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  @Expose({ name: 'size_id' })
  @ApiProperty({ example: 1 })
  sizeId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Expose({ name: 'image_url' })
  @ApiProperty({ example: 'https://example.com/product-variant.jpg' })
  imageUrl: string | null;

  @CreateDateColumn({ type: 'datetime' })
  @Expose({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @Expose({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => ProductEntity, (product) => product.variants)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @ManyToOne(() => ColorEntity)
  @JoinColumn({ name: 'colorId' })
  color: ColorEntity;

  @ManyToOne(() => SizeEntity)
  @JoinColumn({ name: 'sizeId' })
  size: SizeEntity;
}
