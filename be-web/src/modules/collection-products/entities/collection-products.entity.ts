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
import { CollectionEntity } from '../../collections/entities/collections.entity';
import { ProductEntity } from '../../products/entities/products.entity';

@Entity({ name: 'collection_products' })
export class CollectionProductEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  @Expose({ name: 'collection_id' })
  @ApiProperty({ example: 1 })
  collectionId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  @Expose({ name: 'product_id' })
  @ApiProperty({ example: 1 })
  productId: number;

  @Column({ type: 'bigint', unsigned: true, default: 0 })
  @Expose({ name: 'display_order' })
  @ApiProperty({ example: 0 })
  displayOrder: number;

  @CreateDateColumn({ type: 'datetime' })
  @Expose({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @Expose({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => CollectionEntity, (collection) => collection.products)
  @JoinColumn({ name: 'collectionId' })
  collection: CollectionEntity;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;
}
