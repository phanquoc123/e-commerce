import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImageEntity } from '../entities/product-images.entity';
import { CreateProductImageDto } from '../dtos/create-product-image.dto';
import { UpdateProductImageDto } from '../dtos/update-product-image.dto';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImageEntity)
    private readonly productImageRepository: Repository<ProductImageEntity>,
  ) {}

  async create(createProductImageDto: CreateProductImageDto): Promise<ProductImageEntity> {
    // Nếu đặt làm ảnh chính, bỏ isMain của các ảnh khác cùng productColor
    if (createProductImageDto.isMain) {
      await this.productImageRepository.update(
        { productColorId: createProductImageDto.productColorId },
        { isMain: false }
      );
    }

    const productImage = this.productImageRepository.create(createProductImageDto);
    return await this.productImageRepository.save(productImage);
  }

  async findAll(): Promise<ProductImageEntity[]> {
    return await this.productImageRepository.find({
      relations: ['productColor'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ProductImageEntity> {
    const productImage = await this.productImageRepository.findOne({
      where: { id },
      relations: ['productColor'],
    });

    if (!productImage) {
      throw new NotFoundException(`Product image with ID ${id} not found`);
    }

    return productImage;
  }

  async update(id: number, updateProductImageDto: UpdateProductImageDto): Promise<ProductImageEntity> {
    const productImage = await this.findOne(id);
    
    // Nếu đặt làm ảnh chính, bỏ isMain của các ảnh khác cùng productColor
    if (updateProductImageDto.isMain && updateProductImageDto.productColorId) {
      await this.productImageRepository.update(
        { productColorId: updateProductImageDto.productColorId },
        { isMain: false }
      );
    }
    
    Object.assign(productImage, updateProductImageDto);
    return await this.productImageRepository.save(productImage);
  }

  async remove(id: number): Promise<void> {
    const productImage = await this.findOne(id);
    await this.productImageRepository.remove(productImage);
  }

  async findByProductColor(productColorId: number): Promise<ProductImageEntity[]> {
    return await this.productImageRepository.find({
      where: { productColorId },
      relations: ['productColor'],
      order: { isMain: 'DESC', createdAt: 'DESC' },
    });
  }
}
