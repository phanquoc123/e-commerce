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
import { CartItemEntity } from '../../cart-items/entities/cart-items.entity';

@Entity({ name: 'carts' })
export class CartEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Expose({ name: 'cart_token' })
  @ApiProperty({ example: 'e5c2f8b1-2f9a-4c7f-9c0a-1f2d3e4a5b6c' })
  cartToken: string;

  @CreateDateColumn({ type: 'datetime' })
  @Expose({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @Expose({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;

  // Relations
  @OneToMany(() => CartItemEntity, (item) => item.cart)
  items: CartItemEntity[];
}

