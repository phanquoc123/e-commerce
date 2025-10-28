import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '../../products/entities/products.entity';
import { ColorEntity } from '../../colors/entities/colors.entity';
import { ProductImageEntity } from '../../product-images/entities/product-images.entity';
import { ProductVariantEntity } from '../../product-variants/entities/product-variants.entity';

@Entity({ name: 'product_colors' })
export class ProductColorEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  @Expose({ name: 'product_id' })
  @ApiProperty({ example: 1 })
  productId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  @Expose({ name: 'color_id' })
  @ApiProperty({ example: 1 })
  colorId: number;

  @CreateDateColumn({ type: 'datetime' })
  @Expose({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  // Relations
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @ManyToOne(() => ColorEntity)
  @JoinColumn({ name: 'colorId' })
  color: ColorEntity;

  @OneToMany(() => ProductImageEntity, (image) => image.productColor)
  images: ProductImageEntity[];

  @OneToMany(() => ProductVariantEntity, (variant) => variant.productColor)
  variants: ProductVariantEntity[];
}

