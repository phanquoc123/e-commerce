import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColorEntity } from '../entities/colors.entity';
import { CreateColorDto } from '../dtos/create-color.dto';
import { UpdateColorDto } from '../dtos/update-color.dto';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>,
  ) {}

  async create(createColorDto: CreateColorDto): Promise<ColorEntity> {
    const color = this.colorRepository.create(createColorDto);
    return await this.colorRepository.save(color);
  }

  async findAll(): Promise<ColorEntity[]> {
    return await this.colorRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ColorEntity> {
    const color = await this.colorRepository.findOne({
      where: { id },
    });

    if (!color) {
      throw new NotFoundException(`Color with ID ${id} not found`);
    }

    return color;
  }

  async update(id: number, updateColorDto: UpdateColorDto): Promise<ColorEntity> {
    const color = await this.findOne(id);
    
    Object.assign(color, updateColorDto);
    return await this.colorRepository.save(color);
  }

  async remove(id: number): Promise<void> {
    const color = await this.findOne(id);
    await this.colorRepository.delete(id);
  }
}
