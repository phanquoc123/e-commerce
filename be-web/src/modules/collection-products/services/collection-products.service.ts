import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionProductEntity } from '../entities/collection-products.entity';
import { CreateCollectionProductDto } from '../dtos/create-collection-product.dto';
import { UpdateCollectionProductDto } from '../dtos/update-collection-product.dto';

@Injectable()
export class CollectionProductsService {
  constructor(
    @InjectRepository(CollectionProductEntity)
    private readonly collectionProductRepository: Repository<CollectionProductEntity>,
  ) {}

  async create(createCollectionProductDto: CreateCollectionProductDto): Promise<CollectionProductEntity> {
    const collectionProduct = this.collectionProductRepository.create(createCollectionProductDto);
    return await this.collectionProductRepository.save(collectionProduct);
  }

  async findAll(): Promise<CollectionProductEntity[]> {
    return await this.collectionProductRepository.find({
      relations: ['collection', 'product'],
      order: { displayOrder: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<CollectionProductEntity> {
    const collectionProduct = await this.collectionProductRepository.findOne({
      where: { id },
      relations: ['collection', 'product'],
    });

    if (!collectionProduct) {
      throw new NotFoundException(`Collection product with ID ${id} not found`);
    }

    return collectionProduct;
  }

  async update(id: number, updateCollectionProductDto: UpdateCollectionProductDto): Promise<CollectionProductEntity> {
    const collectionProduct = await this.findOne(id);
    
    Object.assign(collectionProduct, updateCollectionProductDto);
    return await this.collectionProductRepository.save(collectionProduct);
  }

  async remove(id: number): Promise<void> {
    const collectionProduct = await this.findOne(id);
    await this.collectionProductRepository.remove(collectionProduct);
  }

  async findByCollection(collectionId: number): Promise<CollectionProductEntity[]> {
    return await this.collectionProductRepository.find({
      where: { collectionId },
      relations: ['collection', 'product'],
      order: { displayOrder: 'ASC', createdAt: 'DESC' },
    });
  }

  async findByProduct(productId: number): Promise<CollectionProductEntity[]> {
    return await this.collectionProductRepository.find({
      where: { productId },
      relations: ['collection', 'product'],
      order: { displayOrder: 'ASC', createdAt: 'DESC' },
    });
  }
}
