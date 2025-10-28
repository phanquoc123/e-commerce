import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderEntity } from '../../orders/entities/orders.entity';
import { ProductVariantEntity } from '../../product-variants/entities/product-variants.entity';

@Entity({ name: 'order_items' })
export class OrderItemEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  @Expose({ name: 'order_id' })
  @ApiProperty({ example: 1 })
  orderId: number;

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

  // Relations
  @ManyToOne(() => OrderEntity, (order) => order.items)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @ManyToOne(() => ProductVariantEntity)
  @JoinColumn({ name: 'variantId' })
  variant: ProductVariantEntity;
}

