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

        // Lấy màu sắc và hình ảnh cho từng sản phẩm
        const mappedProducts = await Promise.all(
          products.map(async (p: any, idx: number) => {
            // Lấy danh sách màu của sản phẩm kèm theo hình ảnh
            const productColors = await this.productRepository.manager.query(
              `
              SELECT 
                pc.id as productColorId,
                c.id as colorId,
                c.name as colorName,
                c.code as colorCode,
                c.hexCode as colorHexCode,
                c.thumbnailUrl as colorThumbnailUrl,
                pi.id as imageId,
                pi.imageUrl,
                pi.isMain,
                pi.sortOrder
              FROM product_colors pc
              INNER JOIN colors c ON pc.colorId = c.id
              LEFT JOIN product_images pi ON pi.productColorId = pc.id
              WHERE pc.productId = ?
              ORDER BY c.id, pi.sortOrder ASC, pi.isMain DESC
              `,
              [p.id],
            );

            // Lấy danh sách sizes có sẵn cho từng màu (từ product_variants)
            const productVariants = await this.productRepository.manager.query(
              `
              SELECT 
                pc.colorId,
                ps.id as sizeId,
                ps.name as sizeName,
                ps.code as sizeCode,
                pv.stock,
                pv.status
              FROM product_variants pv
              INNER JOIN product_colors pc ON pv.colorId = pc.id
              INNER JOIN product_sizes ps ON pv.sizeId = ps.id
              WHERE pv.productId = ? AND pv.status = 'active'
              ORDER BY pc.colorId, ps.id
              `,
              [p.id],
            );

            // Nhóm sizes theo màu
            const colorSizesMap = new Map();
            productVariants.forEach((variant) => {
              if (!colorSizesMap.has(variant.colorId)) {
                colorSizesMap.set(variant.colorId, []);
              }
              colorSizesMap.get(variant.colorId).push({
                id: variant.sizeId,
                name: variant.sizeName,
                code: variant.sizeCode,
                stock: variant.stock,
                status: variant.status,
              });
            });

            // Nhóm hình ảnh theo màu
            const colorsMap = new Map();
            productColors.forEach((row) => {
              if (!colorsMap.has(row.colorId)) {
                colorsMap.set(row.colorId, {
                  id: row.colorId,
                  name: row.colorName,
                  code: row.colorCode,
                  hexCode: row.colorHexCode,
                  thumbnailUrl: row.colorThumbnailUrl,
                  productColorId: row.productColorId,
                  images: [],
                  sizes: colorSizesMap.get(row.colorId) || [],
                });
              }

              // Thêm hình ảnh nếu có
              if (row.imageId) {
                colorsMap.get(row.colorId).images.push({
                  id: row.imageId,
                  imageUrl: row.imageUrl,
                  isMain: Boolean(row.isMain),
                  sortOrder: row.sortOrder,
                });
              }
            });

            const colors = Array.from(colorsMap.values());

            return {
              id: p.id,
              name: p.name,
              slug: p.slug,
              description: p.description,
              price: p.price,
              salePrice: p.salePrice,
              isActive: p.isActive,
              category: p.category
                ? {
                    id: p.category.id,
                    name: p.category.name,
                    slug: p.category.slug,
                  }
                : null,
              colors: colors, // Danh sách màu sắc, hình ảnh và sizes
              displayOrder: idx + 1,
              createdAt: p.createdAt,
              updatedAt: p.updatedAt,
            };
          }),
        );

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
