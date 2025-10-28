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
import { ProductColorEntity } from '../../product-colors/entities/product-colors.entity';
import { ProductSizeEntity } from '../../product-sizes/entities/product-sizes.entity';

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

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  @Expose({ name: 'color_id' })
  @ApiProperty({ example: 1 })
  colorId: number | null;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  @Expose({ name: 'size_id' })
  @ApiProperty({ example: 1 })
  sizeId: number | null;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  @Expose()
  @ApiProperty({ example: 'ATN-RED-M' })
  sku: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @Expose()
  @ApiProperty({ example: 299000 })
  price: number;

  @Column({ type: 'int', default: 0 })
  @Expose()
  @ApiProperty({ example: 100 })
  stock: number;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active',
  })
  @Expose()
  @ApiProperty({ example: 'active' })
  status: 'active' | 'inactive';

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

  @ManyToOne(() => ProductColorEntity, (productColor) => productColor.variants, {
    nullable: true,
  })
  @JoinColumn({ name: 'colorId' })
  productColor: ProductColorEntity | null;

  @ManyToOne(() => ProductSizeEntity, { nullable: true })
  @JoinColumn({ name: 'sizeId' })
  productSize: ProductSizeEntity | null;
}
