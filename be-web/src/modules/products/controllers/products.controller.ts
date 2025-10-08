import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductEntity } from '../entities/products.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo sản phẩm mới' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo sản phẩm thành công',
    type: ProductEntity,
  })
  create(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả sản phẩm' })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: 'Lọc theo danh mục',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách sản phẩm thành công',
    type: [ProductEntity],
  })
  findAll(@Query('categoryId') categoryId?: number): Promise<ProductEntity[]> {
    if (categoryId) {
      return this.productsService.findByCategory(categoryId);
    }
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin sản phẩm theo ID' })
  @ApiParam({ name: 'id', description: 'ID của sản phẩm', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin sản phẩm thành công',
    type: ProductEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy sản phẩm',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin sản phẩm' })
  @ApiParam({ name: 'id', description: 'ID của sản phẩm', type: 'number' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật sản phẩm thành công',
    type: ProductEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy sản phẩm',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa sản phẩm' })
  @ApiParam({ name: 'id', description: 'ID của sản phẩm', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Xóa sản phẩm thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy sản phẩm',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}