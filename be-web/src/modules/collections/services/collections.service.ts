import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionEntity } from '../entities/collections.entity';
import { CreateCollectionDto } from '../dtos/create-collection.dto';
import { UpdateCollectionDto } from '../dtos/update-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(CollectionEntity)
    private readonly collectionRepository: Repository<CollectionEntity>,
  ) {}

  async create(createCollectionDto: CreateCollectionDto): Promise<CollectionEntity> {
    const collection = this.collectionRepository.create(createCollectionDto);
    return await this.collectionRepository.save(collection);
  }

  async findAll(): Promise<CollectionEntity[]> {
    return await this.collectionRepository.find({
      relations: ['products'],
      order: { createdAt: 'DESC' },
    });
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

  async update(id: number, updateCollectionDto: UpdateCollectionDto): Promise<CollectionEntity> {
    const collection = await this.findOne(id);
    
    Object.assign(collection, updateCollectionDto);
    return await this.collectionRepository.save(collection);
  }

  async remove(id: number): Promise<void> {
    const collection = await this.findOne(id);
    await this.collectionRepository.delete(id);
  }
}
