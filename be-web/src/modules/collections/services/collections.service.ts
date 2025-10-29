import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CollectionEntity } from '../entities/collections.entity';
import { CreateCollectionDto } from '../dtos/create-collection.dto';
import { UpdateCollectionDto } from '../dtos/update-collection.dto';
import { CollectionProductEntity } from '../../collection-products/entities/collection-products.entity';

interface GetProductsOptions {
  page: number;
  limit: number;
  search?: string;
}

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(CollectionEntity)
    private readonly collectionRepository: Repository<CollectionEntity>,
    @InjectRepository(CollectionProductEntity)
    private readonly collectionProductRepository: Repository<CollectionProductEntity>,
  ) {}

  async create(
    createCollectionDto: CreateCollectionDto,
  ): Promise<CollectionEntity> {
    const collection = this.collectionRepository.create(createCollectionDto);
    return await this.collectionRepository.save(collection);
  }

  async findAll(includeProducts: boolean = false, productLimit: number = 5) {
    if (!includeProducts) {
      return await this.collectionRepository.find({
        relations: ['products'],
        order: { createdAt: 'DESC' },
      });
    }

    // Lấy tất cả collections
    const collections = await this.collectionRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });

    // Lấy sản phẩm cho mỗi collection
    const collectionsWithProducts = await Promise.all(
      collections.map(async (collection) => {
        const collectionProducts = await this.collectionProductRepository
          .createQueryBuilder('cp')
          .leftJoinAndSelect('cp.product', 'product')
          .leftJoinAndSelect('product.category', 'category')
          .where('cp.collectionId = :collectionId', {
            collectionId: collection.id,
          })
          .orderBy('cp.sortOrder', 'ASC')
          .addOrderBy('cp.createdAt', 'DESC')
          .limit(productLimit)
          .getMany();

        const products = collectionProducts.map((cp) => ({
          id: cp.product.id,
          name: cp.product.name,
          slug: cp.product.slug,
          description: cp.product.description,
          price: cp.product.price,
          isActive: cp.product.isActive,
          category: {
            id: cp.product.category.id,
            name: cp.product.category.name,
            slug: cp.product.category.slug,
          },
          displayOrder: cp.sortOrder,
          createdAt: cp.product.createdAt,
          updatedAt: cp.product.updatedAt,
        }));

        return {
          ...collection,
          products,
          productCount: collectionProducts.length,
        };
      }),
    );

    return collectionsWithProducts;
  }

  async findAllWithProducts(productLimit: number = 5) {
    // Lấy tất cả collections đang active
    const collections = await this.collectionRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });

    // Lấy sản phẩm cho mỗi collection
    const collectionsWithProducts = await Promise.all(
      collections.map(async (collection) => {
        const collectionProducts = await this.collectionProductRepository
          .createQueryBuilder('cp')
          .leftJoinAndSelect('cp.product', 'product')
          .leftJoinAndSelect('product.category', 'category')
          .where('cp.collectionId = :collectionId', {
            collectionId: collection.id,
          })
          .andWhere('product.isActive = :isActive', { isActive: true })
          .orderBy('cp.sortOrder', 'ASC')
          .addOrderBy('cp.createdAt', 'DESC')
          .limit(productLimit)
          .getMany();

        const products = collectionProducts.map((cp) => ({
          id: cp.product.id,
          name: cp.product.name,
          slug: cp.product.slug,
          description: cp.product.description,
          price: cp.product.price,
          isActive: cp.product.isActive,
          category: {
            id: cp.product.category.id,
            name: cp.product.category.name,
            slug: cp.product.category.slug,
          },
          displayOrder: cp.sortOrder,
          createdAt: cp.product.createdAt,
          updatedAt: cp.product.updatedAt,
        }));

        return {
          id: collection.id,
          name: collection.name,
          slug: collection.slug,
          description: collection.description,
          thumbnailUrl: collection.thumbnailUrl,
          isActive: collection.isActive,
          createdAt: collection.createdAt,
          updatedAt: collection.updatedAt,
          products,
          productCount: collectionProducts.length,
        };
      }),
    );

    return {
      data: collectionsWithProducts,
      total: collections.length,
    };
  }

  async findOne(id: number): Promise<CollectionEntity> {
    const collection = await this.collectionRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!collection) {
      throw new NotFoundException(`Collection with ID ${id} not found`);
    }

    return collection;
  }

  async update(
    id: number,
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<CollectionEntity> {
    const collection = await this.findOne(id);

    Object.assign(collection, updateCollectionDto);
    return await this.collectionRepository.save(collection);
  }

  async remove(id: number): Promise<void> {
    const collection = await this.findOne(id);
    await this.collectionRepository.delete(id);
  }

  async getProductsByCollection(
    collectionId: number,
    options: GetProductsOptions,
  ) {
    // Kiểm tra collection có tồn tại không
    const collection = await this.collectionRepository.findOne({
      where: { id: collectionId },
    });

    if (!collection) {
      throw new NotFoundException(
        `Collection with ID ${collectionId} not found`,
      );
    }

    const { page, limit, search } = options;
    const skip = (page - 1) * limit;

    // Xây dựng query builder
    const queryBuilder = this.collectionProductRepository
      .createQueryBuilder('cp')
      .leftJoinAndSelect('cp.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .where('cp.collectionId = :collectionId', { collectionId })
      .orderBy('cp.displayOrder', 'ASC')
      .addOrderBy('cp.createdAt', 'DESC');

    // Thêm điều kiện tìm kiếm nếu có
    if (search) {
      queryBuilder.andWhere('product.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    // Lấy tổng số records
    const total = await queryBuilder.getCount();

    // Lấy dữ liệu với phân trang
    const collectionProducts = await queryBuilder
      .skip(skip)
      .take(limit)
      .getMany();

    // Chuyển đổi dữ liệu để trả về
    const products = collectionProducts.map((cp) => ({
      id: cp.product.id,
      name: cp.product.name,
      slug: cp.product.slug,
      description: cp.product.description,
      price: cp.product.price,
      isActive: cp.product.isActive,
      category: {
        id: cp.product.category.id,
        name: cp.product.category.name,
        slug: cp.product.category.slug,
      },
      displayOrder: cp.sortOrder,
      createdAt: cp.product.createdAt,
      updatedAt: cp.product.updatedAt,
    }));

    return {
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }
}
