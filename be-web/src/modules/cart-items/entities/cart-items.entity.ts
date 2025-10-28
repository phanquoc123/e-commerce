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
import { CartEntity } from '../../carts/entities/carts.entity';
import { ProductVariantEntity } from '../../product-variants/entities/product-variants.entity';

@Entity({ name: 'cart_items' })
export class CartItemEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  @Expose({ name: 'cart_id' })
  @ApiProperty({ example: 1 })
  cartId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  @Expose({ name: 'variant_id' })
  @ApiProperty({ example: 1 })
  variantId: number;

  @Column({ type: 'int', nullable: false, default: 1 })
  @Expose()
  @ApiProperty({ example: 2 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @Expose()
  @ApiProperty({ example: 299000 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @Expose({ name: 'sale_price' })
  @ApiProperty({ example: 249000 })
  salePrice: number | null;

  @CreateDateColumn({ type: 'datetime' })
  @Expose({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @Expose({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => CartEntity, (cart) => cart.items)
  @JoinColumn({ name: 'cartId' })
  cart: CartEntity;

  @ManyToOne(() => ProductVariantEntity)
  @JoinColumn({ name: 'variantId' })
  variant: ProductVariantEntity;
}

