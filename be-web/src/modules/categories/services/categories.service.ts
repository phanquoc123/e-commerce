import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/categories.entity';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const entity = this.categoryRepository.create({
      name: dto.name,
      slug: this.generateSlug(dto.name),
      parentId: dto.parent_id ?? null,
      isActive: dto.is_active ?? true,
      sortOrder: dto.sort_order ?? 0,
    });
    return await this.categoryRepository.save(entity);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const found = await this.categoryRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException('Category not found');
    return found;
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<CategoryEntity> {
    const entity = await this.findOne(id);
    if (dto.name !== undefined) entity.name = dto.name;
    if (dto.name !== undefined) entity.slug = this.generateSlug(dto.name);
    if (dto.parent_id !== undefined) entity.parentId = dto.parent_id as number | null;
    if (dto.is_active !== undefined) entity.isActive = dto.is_active;
    if (dto.sort_order !== undefined) entity.sortOrder = dto.sort_order;
    return await this.categoryRepository.save(entity);
  }

  async remove(id: number): Promise<void> {
    const found = await this.findOne(id);
    await this.categoryRepository.softRemove(found);
  }

  private generateSlug(input: string): string {
    const from = 'áàảãạăắằẳẵặâấầẩẫậđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬĐÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ';
    const to   = 'aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYY';
    let str = input.split('').map((c) => {
      const index = from.indexOf(c);
      return index > -1 ? to[index] : c;
    }).join('');
    str = str
      .normalize('NFD').replace(/\p{Diacritic}+/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    return str;
  }
}

