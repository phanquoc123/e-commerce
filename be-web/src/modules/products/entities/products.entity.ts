import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from '../../categories/entities/categories.entity';
import { CollectionEntity } from 'src/modules/collections/entities/collections.entity';
import { ProductVariantEntity } from 'src/modules/product-variants/entities/product-variants.entity';
import { ProductColorEntity } from 'src/modules/product-colors/entities/product-colors.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  @Expose({ name: 'category_id' })
  @ApiProperty({ example: 1 })
  categoryId: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Expose()
  @ApiProperty({ example: 'Áo thun nam' })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  @Expose()
  @ApiProperty({ example: 'ao-thun-nam' })
  slug: string;

  @Column({ type: 'text', nullable: true })
  @Expose()
  @ApiProperty({ example: 'Áo thun nam chất liệu cotton cao cấp' })
  description: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @Expose()
  @ApiProperty({ example: 299000 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @Expose({ name: 'sale_price' })
  @ApiProperty({ example: 249000 })
  salePrice: number | null;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  @Expose({ name: 'is_active' })
  @ApiProperty({ example: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'datetime' })
  @Expose({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @Expose({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @OneToMany(() => ProductVariantEntity, (variant) => variant.product)
  variants: ProductVariantEntity[];
  @OneToMany(() => ProductColorEntity, (productColor) => productColor.product)
  colors: ProductColorEntity[];
  @ManyToMany(() => CollectionEntity, (collection) => collection.products)
  collections: CollectionEntity[];
}
