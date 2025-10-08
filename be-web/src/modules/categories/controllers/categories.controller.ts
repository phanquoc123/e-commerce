import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { CategoryService } from '../services/categories.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoryEntity } from '../entities/categories.entity';
import { plainToInstance } from 'class-transformer';
import { CATEGORY_EXAMPLES, API_RESPONSE_EXAMPLES, PAGINATION_EXAMPLES } from '../../../common/constants/api-examples';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ResponseMessage('Create category successfully')
  @ApiBody({ type: CreateCategoryDto })
  @ApiOkResponse({
    description: 'Created category',
    schema: {
      example: API_RESPONSE_EXAMPLES.SUCCESS_RESPONSE(CATEGORY_EXAMPLES.SINGLE_CATEGORY),
    },
  })
  async create(@Body() dto: CreateCategoryDto) {
    const entity = await this.categoryService.create(dto);
    return plainToInstance(CategoryEntity, entity, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @ResponseMessage('Get categories successfully')
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiOkResponse({
    description: 'Paginated list of categories',
    schema: {
      example: API_RESPONSE_EXAMPLES.PAGINATED_RESPONSE(
        CATEGORY_EXAMPLES.CATEGORY_LIST,
        PAGINATION_EXAMPLES.paginate
      ),
    },
  })
  async findAll(@Query() paginationDto: PaginationDto) {
    const result = await this.categoryService.findAllPaginated(paginationDto);
    
    return {
      data: result.data.map((e) =>
        plainToInstance(CategoryEntity, e, { excludeExtraneousValues: true })
      ),
      paginate: result.paginate,
    };
  }

  @Get('all')
  @ResponseMessage('Get all categories successfully')
  @ApiOkResponse({
    description: 'List all categories without pagination',
    schema: {
      example: API_RESPONSE_EXAMPLES.SUCCESS_RESPONSE(CATEGORY_EXAMPLES.CATEGORY_LIST),
    },
  })
  async findAllWithoutPagination() {
    const list = await this.categoryService.findAll();
    return list.map((e) =>
      plainToInstance(CategoryEntity, e, { excludeExtraneousValues: true }),
    );
  }

  @Get('tree')
  @ResponseMessage('Get categories tree successfully')
  @ApiOkResponse({
    description: 'Get categories in nested tree structure with parent-child relationships',
    schema: {
      example: API_RESPONSE_EXAMPLES.SUCCESS_RESPONSE([
        {
          id: 1,
          name: 'Nam',
          slug: 'nam',
          thumbnail: 'https://example.com/nam-thumbnail.jpg',
          parent_id: null,
          is_active: true,
          sort_order: 1,
          children: [
            {
              id: 8,
              name: 'Áo khoác nam',
              slug: 'ao-khoac-nam',
              thumbnail: 'https://example.com/ao-khoac-nam-thumbnail.jpg',
              parent_id: 1,
              is_active: true,
              sort_order: 4,
              children: [
                {
                  id: 13,
                  name: 'Áo chống nắng nam',
                  slug: 'ao-chong-nang-nam',
                  thumbnail: 'https://example.com/ao-chong-nang-nam-thumbnail.jpg',
                  parent_id: 8,
                  is_active: true,
                  sort_order: 1,
                  children: []
                }
              ]
            }
          ]
        }
      ]),
    },
  })
  async findCategoriesTree() {
    return await this.categoryService.findHierarchyTree();
  }

  @Get(':id')
  @ResponseMessage('Get category successfully')
  @ApiOkResponse({
    description: 'Get category by id',
    schema: {
      example: API_RESPONSE_EXAMPLES.SUCCESS_RESPONSE(CATEGORY_EXAMPLES.SINGLE_CATEGORY),
    },
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const entity = await this.categoryService.findOne(id);
    return plainToInstance(CategoryEntity, entity, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @ResponseMessage('Update category successfully')
  @ApiBody({ type: UpdateCategoryDto })
  @ApiOkResponse({
    description: 'Updated category',
    schema: {
      example: API_RESPONSE_EXAMPLES.SUCCESS_RESPONSE(CATEGORY_EXAMPLES.UPDATED_CATEGORY),
    },
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    const entity = await this.categoryService.update(id, dto);
    return plainToInstance(CategoryEntity, entity, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @ResponseMessage('Delete category successfully')
  @ApiOkResponse({
    description: 'Deleted category',
    schema: {
      example: API_RESPONSE_EXAMPLES.DELETE_RESPONSE,
    },
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.categoryService.remove(id);
    return { deleted: true };
  }
}
