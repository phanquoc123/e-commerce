import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { BaseEntityWithTimestamps } from '../../../common/entities/base-timestamp.entity';
import { ProductEntity } from '../../products/entities/products.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntityWithTimestamps {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  @Expose()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Expose()
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  @Expose()
  slug: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @Expose()
  thumbnail: string | null;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  @Expose({ name: 'parent_id' })
  parentId: number | null;

  @Column({ type: 'boolean', nullable: false, default: true })
  @Expose({ name: 'is_active' })
  isActive: boolean;

  @Column({ type: 'bigint', unsigned: true, nullable: false, default: 0 })
  @Expose({ name: 'sort_order' })
  sortOrder: number;

  @ManyToOne(() => CategoryEntity, (category) => category.children, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'parentId' })
  parent: CategoryEntity | null;

  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children: CategoryEntity[];

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
