import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderItemEntity } from '../../order-items/entities/order-items.entity';

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPING = 'shipping',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  COD = 'cod',
  BANK = 'bank',
  CREDIT_CARD = 'credit_card',
}

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  @Expose({ name: 'user_id' })
  @ApiProperty({ example: 1 })
  userId: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  @Expose({ name: 'order_code' })
  @ApiProperty({ example: 'ORD202510280001' })
  orderCode: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    nullable: false,
    default: OrderStatus.PENDING,
  })
  @Expose()
  @ApiProperty({ enum: OrderStatus, example: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  @Expose({ name: 'total_price' })
  @ApiProperty({ example: 1500000 })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: false,
    default: PaymentMethod.COD,
  })
  @Expose({ name: 'payment_method' })
  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.COD })
  paymentMethod: PaymentMethod;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @Expose({ name: 'shipping_address' })
  @ApiProperty({ example: '123 Nguyễn Huệ, Q1, TP.HCM' })
  shippingAddress: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @Expose()
  @ApiProperty({ example: '0987654321' })
  phone: string | null;

  @Column({ type: 'text', nullable: true })
  @Expose()
  @ApiProperty({ example: 'Giao hàng buổi sáng' })
  note: string | null;

  @CreateDateColumn({ type: 'datetime' })
  @Expose({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @Expose({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;

  // Relations
  @OneToMany(() => OrderItemEntity, (item) => item.order)
  items: OrderItemEntity[];
}

