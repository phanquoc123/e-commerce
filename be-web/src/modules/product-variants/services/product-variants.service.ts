import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariantEntity } from '../entities/product-variants.entity';
import { CreateProductVariantDto } from '../dtos/create-product-variant.dto';
import { UpdateProductVariantDto } from '../dtos/update-product-variant.dto';

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectRepository(ProductVariantEntity)
    private readonly productVariantRepository: Repository<ProductVariantEntity>,
  ) {}

  async create(createProductVariantDto: CreateProductVariantDto): Promise<ProductVariantEntity> {
    const productVariant = this.productVariantRepository.create(createProductVariantDto);
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

  async update(id: number, updateProductVariantDto: UpdateProductVariantDto): Promise<ProductVariantEntity> {
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
}
