import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/categories.entity';
import {
  CreateCategoryParamsDto,
  UpdateCategoryParamsDto,
  SearchCategoryDto,
} from '../dtos/category.params.dto';
import {
  PaginationParamsDto,
  PaginationResponseDto,
} from 'src/common/dtos/pagination.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(dto: CreateCategoryParamsDto): Promise<CategoryEntity> {
    const entity = this.categoryRepository.create({
      name: dto.name,
      slug: this.generateSlug(dto.name),
      thumbnail: dto.thumbnail ?? null,
      parentId: dto.parentId ?? null,
      isActive: dto.isActive ?? true,
      sortOrder: dto.sortOrder ?? 0,
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
    allCategories.forEach((cat) => {
      categoryMap.set(cat.id, {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        thumbnail: cat.thumbnail,
        parentId: cat.parentId,
        isActive: cat.isActive,
        sortOrder: cat.sortOrder,
        children: [],
      });
    });

    // Xây dựng cây hierarchy
    const rootCategories: any[] = [];
    allCategories.forEach((cat) => {
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
    const sortChildren = (categories: any[]) => {
      categories.sort((a, b) => a.sortOrder - b.sortOrder);
      categories.forEach((cat) => {
        if (cat.children.length > 0) {
          sortChildren(cat.children);
        }
      });
    };

    sortChildren(rootCategories);
    return rootCategories.slice(0, 3);
  }

  async findAllPaginated(
    searchDto: SearchCategoryDto,
  ): Promise<{ data: CategoryEntity[]; pagination: PaginationResponseDto }> {
    const { page = 1, limit = 10, keyword, isActive, parentId } = searchDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.categoryRepository.createQueryBuilder('category');

    // Search by keyword
    if (keyword) {
      queryBuilder.andWhere(
        '(category.name LIKE :keyword OR category.slug LIKE :keyword)',
        { keyword: `%${keyword}%` },
      );
    }

    // Filter by isActive
    if (isActive !== undefined) {
      queryBuilder.andWhere('category.isActive = :isActive', { isActive });
    }

    // Filter by parentId
    if (parentId !== undefined) {
      queryBuilder.andWhere('category.parentId = :parentId', { parentId });
    }

    // Order and pagination
    queryBuilder
      .orderBy('category.sortOrder', 'ASC')
      .addOrderBy('category.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    const pagination: PaginationResponseDto = {
      page,
      limit,
      total,
    };

    return {
      data,
      pagination,
    };
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const found = await this.categoryRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException('Category not found');
    return found;
  }

  async update(
    id: number,
    dto: UpdateCategoryParamsDto,
  ): Promise<CategoryEntity> {
    const entity = await this.findOne(id);
    if (dto.name !== undefined) entity.name = dto.name;
    if (dto.name !== undefined) entity.slug = this.generateSlug(dto.name);
    if (dto.thumbnail !== undefined) entity.thumbnail = dto.thumbnail;
    if (dto.parentId !== undefined)
      entity.parentId = dto.parentId as number | null;
    if (dto.isActive !== undefined) entity.isActive = dto.isActive;
    if (dto.sortOrder !== undefined) entity.sortOrder = dto.sortOrder;
    return await this.categoryRepository.save(entity);
  }

  async remove(id: number): Promise<void> {
    const found = await this.findOne(id);
    await this.categoryRepository.remove(found);
  }

  private generateSlug(input: string): string {
    const from =
      'áàảãạăắằẳẵặâấầẩẫậđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬĐÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ';
    const to =
      'aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYY';
    let str = input
      .split('')
      .map((c) => {
        const index = from.indexOf(c);
        return index > -1 ? to[index] : c;
      })
      .join('');
    str = str
      .normalize('NFD')
      .replace(/\p{Diacritic}+/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    return str;
  }
}
