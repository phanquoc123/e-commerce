import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { CategoryService } from '../services/categories.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoryEntity } from '../entities/categories.entity';
import { plainToInstance } from 'class-transformer';

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
      example: {
        data: {
          status: 200,
          message: 'OK',
          success: true,
          result: {
            id: 1,
            name: 'Shoes',
            parent_id: null,
            slug: 'shoes',
            is_active: true,
            sort_order: 0,
          },
        },
      },
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
  @ApiOkResponse({
    description: 'List categories',
    schema: {
      example: {
        data: {
          status: 200,
          message: 'OK',
          success: true,
          result: [
            {
              id: 1,
              name: 'Shoes',
              slug: 'shoes',
              parent_id: null,
              is_active: true,
              sort_order: 0,
            },
          ],
        },
      },
    },
  })
  async findAll() {
    const list = await this.categoryService.findAll();
    return list.map((e) =>
      plainToInstance(CategoryEntity, e, { excludeExtraneousValues: true }),
    );
  }

  @Get(':id')
  @ResponseMessage('Get category successfully')
  @ApiOkResponse({
    description: 'Get category by id',
    schema: {
      example: {
        data: {
          status: 200,
          message: 'OK',
          success: true,
          result: {
            id: 1,
            name: 'Shoes',
            slug: 'shoes',
            parent_id: null,
            is_active: true,
            sort_order: 0,
          },
        },
      },
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
      example: {
        data: {
          status: 200,
          message: 'OK',
          success: true,
          result: {
            id: 1,
            name: 'Sneakers',
            slug: 'sneakers',
            parent_id: null,
            is_active: true,
            sort_order: 5,
          },
        },
      },
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
      example: {
        data: {
          status: 200,
          message: 'OK',
          success: true,
          result: { deleted: true },
        },
      },
    },
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.categoryService.remove(id);
    return { deleted: true };
  }
}
