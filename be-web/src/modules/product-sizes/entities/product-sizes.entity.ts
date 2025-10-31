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
import { ProductVariantEntity } from 'src/modules/product-variants/entities/product-variants.entity';

@Entity({ name: 'product_sizes' })
export class ProductSizeEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  @Expose()
  @ApiProperty({ example: 'M' })
  name: string;

  @Column({ type: 'varchar', length: 10, nullable: false, unique: true })
  @Expose()
  @ApiProperty({ example: 'M' })
  code: string;

  @CreateDateColumn({ type: 'datetime' })
  @Expose({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @Expose({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;
  @OneToMany(() => ProductVariantEntity, (variant) => variant.sizeId)
  variants: ProductVariantEntity[];
}
