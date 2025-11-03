import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariantEntity } from '../entities/product-variants.entity';
import { CreateProductVariantDto } from '../dtos/create-product-variant.dto';
import { UpdateProductVariantDto } from '../dtos/update-product-variant.dto';
import { ProductEntity } from '../../products/entities/products.entity';

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectRepository(ProductVariantEntity)
    private readonly productVariantRepository: Repository<ProductVariantEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(
    createProductVariantDto: CreateProductVariantDto,
  ): Promise<ProductVariantEntity> {
    const productVariant = this.productVariantRepository.create(
      createProductVariantDto,
    );
    return await this.productVariantRepository.save(productVariant);
  }

  async findAll(): Promise<ProductVariantEntity[]> {
    return await this.productVariantRepository.find({
      relations: ['product', 'color', 'size'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ProductVariantEntity> {
    const productVariant = await this.productVariantRepository.findOne({
      where: { id },
      relations: ['product', 'color', 'size'],
    });

    if (!productVariant) {
      throw new NotFoundException(`Product variant with ID ${id} not found`);
    }

    return productVariant;
  }

  async update(
    id: number,
    updateProductVariantDto: UpdateProductVariantDto,
  ): Promise<ProductVariantEntity> {
    const productVariant = await this.findOne(id);

    Object.assign(productVariant, updateProductVariantDto);
    return await this.productVariantRepository.save(productVariant);
  }

  async remove(id: number): Promise<void> {
    const productVariant = await this.findOne(id);
    await this.productVariantRepository.remove(productVariant);
  }

  async findByProduct(productId: number): Promise<ProductVariantEntity[]> {
    return await this.productVariantRepository.find({
      where: { productId },
      relations: ['product', 'color', 'size'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Lấy chi tiết sản phẩm với đầy đủ thông tin màu sắc, hình ảnh, sizes và variants
   * @param slug - Slug của sản phẩm
   * @param colorId - ID của màu sắc (tùy chọn)
   * @param sizeId - ID của size (tùy chọn)
   * @returns Chi tiết sản phẩm đầy đủ
   */
  async getProductDetail(
    slug: string,
    colorId?: number | null,
    sizeId?: number | null,
  ) {
    // Lấy thông tin sản phẩm cơ bản
    const product = await this.productRepository.findOne({
      where: { slug, isActive: true },
      // relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Product with slug "${slug}" not found`);
    }

    // Lấy chi tiết màu sắc, hình ảnh và variants thông qua raw query (trả về tất cả)
    const productColorsData = await this.productRepository.manager.query(
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
        pi.sortOrder as imageSortOrder,
        pv.id as variantId,
        pv.sku,
        pv.price as variantPrice,
        pv.stock,
        pv.status as variantStatus,
        ps.id as sizeId,
        ps.name as sizeName,
        ps.code as sizeCode
      FROM product_colors pc
      INNER JOIN colors c ON pc.colorId = c.id
      LEFT JOIN product_images pi ON pi.productColorId = pc.id
      LEFT JOIN product_variants pv ON pv.colorId = pc.id AND pv.productId = ?
      LEFT JOIN product_sizes ps ON pv.sizeId = ps.id
      WHERE pc.productId = ?
      ORDER BY c.id, pi.sortOrder ASC, pi.isMain DESC, ps.id ASC
      `,
      [product.id, product.id],
    );

    // Nhóm dữ liệu theo màu
    const colorsMap = new Map();

    productColorsData.forEach((row) => {
      if (!colorsMap.has(row.colorId)) {
        colorsMap.set(row.colorId, {
          id: row.colorId,
          name: row.colorName,
          code: row.colorCode,
          hexCode: row.colorHexCode,
          thumbnailUrl: row.colorThumbnailUrl,
          productColorId: row.productColorId,
          isSelected:
            colorId !== null &&
            colorId !== undefined &&
            row.colorId === colorId,
          images: [],
          sizes: [],
          variants: [],
        });
      }

      const colorData = colorsMap.get(row.colorId);

      // Thêm hình ảnh (tránh duplicate)
      if (
        row.imageId &&
        !colorData.images.find((img) => img.id === row.imageId)
      ) {
        colorData.images.push({
          id: row.imageId,
          imageUrl: row.imageUrl,
          isMain: Boolean(row.isMain),
          sortOrder: row.imageSortOrder,
        });
      }

      // Thêm size (tránh duplicate)
      if (row.sizeId && !colorData.sizes.find((s) => s.id === row.sizeId)) {
        colorData.sizes.push({
          id: row.sizeId,
          name: row.sizeName,
          code: row.sizeCode,
          isSelected:
            sizeId !== null && sizeId !== undefined && row.sizeId === sizeId,
        });
      }

      // Thêm variant (tránh duplicate)
      if (
        row.variantId &&
        !colorData.variants.find((v) => v.id === row.variantId)
      ) {
        const isVariantSelected =
          (colorId === null ||
            colorId === undefined ||
            row.colorId === colorId) &&
          (sizeId === null || sizeId === undefined || row.sizeId === sizeId);

        colorData.variants.push({
          id: row.variantId,
          sku: row.sku,
          price: parseFloat(row.variantPrice),
          stock: row.stock,
          status: row.variantStatus,
          sizeId: row.sizeId,
          sizeName: row.sizeName,
          sizeCode: row.sizeCode,
          isSelected: isVariantSelected,
        });
      }
    });

    const colors = Array.from(colorsMap.values());

    // Lấy danh sách variants kèm images theo từng variant (images theo màu của variant) - trả về tất cả
    const variantsRaw = await this.productRepository.manager.query(
      `
      SELECT 
        pv.id as variantId,
        pv.sku as sku,
        pv.price as variantPrice,
        pv.stock as stock,
        pv.status as status,
        pv.colorId as productColorId,
        pc.colorId as colorId,
        c.name as colorName,
        c.code as colorCode,
        c.hexCode as colorHexCode,
        pv.sizeId as sizeId,
        ps.name as sizeName,
        ps.code as sizeCode,
        pi.id as imageId,
        pi.imageUrl as imageUrl,
        pi.isMain as isMain,
        pi.sortOrder as sortOrder
      FROM product_variants pv
      INNER JOIN product_colors pc ON pv.colorId = pc.id
      LEFT JOIN colors c ON pc.colorId = c.id
      LEFT JOIN product_sizes ps ON pv.sizeId = ps.id
      LEFT JOIN product_images pi ON pi.productColorId = pc.id
      WHERE pv.productId = ?
      ORDER BY pv.id ASC, pi.sortOrder ASC, pi.isMain DESC
      `,
      [product.id],
    );

    const variantsMap = new Map();
    variantsRaw.forEach((row) => {
      if (!variantsMap.has(row.variantId)) {
        const isVariantSelected =
          (colorId === null ||
            colorId === undefined ||
            row.colorId === colorId) &&
          (sizeId === null || sizeId === undefined || row.sizeId === sizeId);

        variantsMap.set(row.variantId, {
          id: row.variantId,
          sku: row.sku,
          price: parseFloat(row.variantPrice),
          stock: row.stock,
          status: row.status,
          colorId: row.colorId,
          productColorId: row.productColorId,
          sizeId: row.sizeId,
          isSelected: isVariantSelected,
          color: row.colorId
            ? {
                id: row.colorId,
                name: row.colorName,
                code: row.colorCode,
                hexCode: row.colorHexCode,
              }
            : null,
          size: row.sizeId
            ? { id: row.sizeId, name: row.sizeName, code: row.sizeCode }
            : null,
          images: [],
        });
      }
      const variant = variantsMap.get(row.variantId);
      if (
        row.imageId &&
        !variant.images.find((img) => img.id === row.imageId)
      ) {
        variant.images.push({
          id: row.imageId,
          imageUrl: row.imageUrl,
          isMain: Boolean(row.isMain),
          sortOrder: row.sortOrder,
        });
      }
    });
    const variants = Array.from(variantsMap.values());

    // Tính % discount nếu có
    let discountPercent: number | null = null;
    if (product.salePrice && product.salePrice < product.price) {
      discountPercent = Math.round(
        ((product.price - product.salePrice) / product.price) * 100,
      );
    }

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      salePrice: product.salePrice,
      discountPercent,
      isActive: product.isActive,
      selectedColorId: colorId || null,
      selectedSizeId: sizeId || null,
      colors: colors,
      variants: variants,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  /**
   * Lấy chi tiết sản phẩm theo ID
   * @param productId - ID của sản phẩm
   * @returns Chi tiết sản phẩm đầy đủ
   */
  async getProductDetailById(productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return this.getProductDetail(product.slug);
  }
}
