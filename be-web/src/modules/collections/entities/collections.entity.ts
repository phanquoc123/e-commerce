import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from 'src/modules/products/entities/products.entity';

@Entity({ name: 'collections' })
export class CollectionEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Expose()
  @ApiProperty({ example: 'Bộ sưu tập mùa hè' })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  @Expose()
  @ApiProperty({ example: 'bo-suu-tap-mua-he' })
  slug: string;

  @Column({ type: 'text', nullable: true })
  @Expose()
  @ApiProperty({ example: 'Bộ sưu tập thời trang mùa hè 2024' })
  description: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Expose()
  @ApiProperty({ example: 'https://example.com/collection-thumbnail.jpg' })
  thumbnailUrl: string | null;

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

  @ManyToMany(() => ProductEntity, (product) => product.collections)
  @JoinTable({
    name: 'collection_products', // bảng trung gian
    joinColumn: { name: 'collection_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: ProductEntity;
}
