import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/products.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find({
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.findOne(id);
    
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.delete(id);
  }

  async findByCategory(categoryId: number): Promise<ProductEntity[]> {
    return await this.productRepository.find({
      where: { categoryId },
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
  }
}