import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SizeEntity } from '../entities/sizes.entity';
import { CreateSizeDto } from '../dtos/create-size.dto';
import { UpdateSizeDto } from '../dtos/update-size.dto';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(SizeEntity)
    private readonly sizeRepository: Repository<SizeEntity>,
  ) {}

  async create(createSizeDto: CreateSizeDto): Promise<SizeEntity> {
    const size = this.sizeRepository.create(createSizeDto);
    return await this.sizeRepository.save(size);
  }

  async findAll(): Promise<SizeEntity[]> {
    return await this.sizeRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<SizeEntity> {
    const size = await this.sizeRepository.findOne({
      where: { id },
    });

    if (!size) {
      throw new NotFoundException(`Size with ID ${id} not found`);
    }

    return size;
  }

  async update(id: number, updateSizeDto: UpdateSizeDto): Promise<SizeEntity> {
    const size = await this.findOne(id);
    
    Object.assign(size, updateSizeDto);
    return await this.sizeRepository.save(size);
  }

  async remove(id: number): Promise<void> {
    const size = await this.findOne(id);
    await this.sizeRepository.delete(id);
  }
}
