import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionEntity } from '../entities/collections.entity';
import { ProductEntity } from '../../products/entities/products.entity';
import { CreateCollectionDto } from '../dtos/create-collection.dto';
import { UpdateCollectionDto } from '../dtos/update-collection.dto';

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
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
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
        order: { createdAt: 'DESC' },
      });
    }

    const collections = await this.collectionRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });

    return collections.map((collection) => ({
      id: collection.id,
      name: collection.name,
      slug: collection.slug,
      description: collection.description,
      thumbnailUrl: collection.thumbnailUrl,
      isActive: collection.isActive,
      createdAt: collection.createdAt,
      updatedAt: collection.updatedAt,
      products: [],
      productCount: 0,
    }));
  }

  async findAllWithProducts(productLimit: number = 10) {
    const collections = await this.collectionRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });

    // Lấy sản phẩm theo từng collection thông qua bảng trung gian collection_products
    const collectionsWithProducts = await Promise.all(
      collections.map(async (collection) => {
        // Join với bảng trung gian collection_products để lấy đúng sản phẩm theo collection
        const products = await this.productRepository
          .createQueryBuilder('product')
          .innerJoin(
            'collection_products',
            'cp',
            'cp.productId = product.id AND cp.collectionId = :collectionId',
            { collectionId: collection.id },
          )
          .leftJoinAndSelect('product.category', 'category')
          .where('product.isActive = :active', { active: true })
          .orderBy('cp.sortOrder', 'ASC')
          .addOrderBy('product.createdAt', 'DESC')
          .limit(productLimit)
          .getMany();

        const mappedProducts = products.map((p: any, idx: number) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          price: p.price,
          isActive: p.isActive,
          category: p.category
            ? {
                id: p.category.id,
                name: p.category.name,
                slug: p.category.slug,
              }
            : null,
          displayOrder: idx + 1,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
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
          products: mappedProducts,
          productCount: mappedProducts.length,
        };
      }),
    );

    // Trả thẳng mảng items để wrapper đặt vào result
    return collectionsWithProducts;
  }

  async findOne(id: number): Promise<CollectionEntity> {
    const collection = await this.collectionRepository.findOne({
      where: { id },
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
    // Không còn dùng bảng trung gian, trả về danh sách rỗng
    const total = 0;

    return {
      data: [],
      pagination: {
        page,
        limit,
        total,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      },
    };
  }
}
