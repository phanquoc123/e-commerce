import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/categories.entity';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PaginatedResponseDto, PaginationMetaDto } from 'src/common/dtos/paginated-response.dto';

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
      thumbnail: dto.thumbnail ?? null,
      parentId: dto.parent_id ?? null,
      isActive: dto.is_active ?? true,
      sortOrder: dto.sort_order ?? 0,
    });
    return await this.categoryRepository.save(entity);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async findAllWithHierarchy(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find({
      relations: ['parent', 'children'],
      order: {
        sortOrder: 'ASC',
        createdAt: 'DESC',
      },
    });
  }

  async findRootCategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find({
      where: { parentId: null as any },
      relations: ['children'],
      order: {
        sortOrder: 'ASC',
      },
    });
  }

  async findHierarchyTree(): Promise<any[]> {
    // Lấy tất cả categories với relations
    const allCategories = await this.categoryRepository.find({
      relations: ['children'],
      order: {
        sortOrder: 'ASC',
        createdAt: 'DESC',
      },
    });

    // Tạo map để dễ dàng tìm kiếm
    const categoryMap = new Map();
    allCategories.forEach(cat => {
      categoryMap.set(cat.id, {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        thumbnail: cat.thumbnail,
        parent_id: cat.parentId,
        is_active: cat.isActive,
        sort_order: cat.sortOrder,
        children: []
      });
    });

    // Xây dựng cây hierarchy
    const rootCategories: any[] = [];
    allCategories.forEach(cat => {
      const categoryNode = categoryMap.get(cat.id);
      
      if (cat.parentId === null) {
        // Đây là root category
        rootCategories.push(categoryNode);
      } else {
        // Đây là child category
        const parent = categoryMap.get(cat.parentId);
        if (parent) {
          parent.children.push(categoryNode);
        }
      }
    });

    // Sắp xếp children theo sortOrder
    const sortChildren = (categories) => {
      categories.sort((a, b) => a.sort_order - b.sort_order);
      categories.forEach(cat => {
        if (cat.children.length > 0) {
          sortChildren(cat.children);
        }
      });
    };

    sortChildren(rootCategories);
    return rootCategories;
  }

  async findAllPaginated(paginationDto: PaginationDto): Promise<PaginatedResponseDto<CategoryEntity>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.categoryRepository.findAndCount({
      skip,
      take: limit,
      order: {
        sortOrder: 'ASC',
        createdAt: 'DESC',
      },
    });

    const totalPages = Math.ceil(total / limit);

    const paginate: PaginationMetaDto = {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    return {
      data,
      paginate,
    };
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
    if (dto.thumbnail !== undefined) entity.thumbnail = dto.thumbnail;
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

