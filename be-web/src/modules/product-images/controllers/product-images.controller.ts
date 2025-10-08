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
import { ProductImagesService } from '../services/product-images.service';
import { CreateProductImageDto } from '../dtos/create-product-image.dto';
import { UpdateProductImageDto } from '../dtos/update-product-image.dto';
import { ProductImageEntity } from '../entities/product-images.entity';

@ApiTags('Product Images')
@Controller('product-images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo hình ảnh sản phẩm mới' })
  @ApiBody({ type: CreateProductImageDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo hình ảnh sản phẩm thành công',
    type: ProductImageEntity,
  })
  create(@Body() createProductImageDto: CreateProductImageDto): Promise<ProductImageEntity> {
    return this.productImagesService.create(createProductImageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả hình ảnh sản phẩm' })
  @ApiQuery({
    name: 'productId',
    required: false,
    description: 'Lọc theo sản phẩm',
    type: Number,
  })
  @ApiQuery({
    name: 'variantId',
    required: false,
    description: 'Lọc theo biến thể sản phẩm',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách hình ảnh sản phẩm thành công',
    type: [ProductImageEntity],
  })
  findAll(
    @Query('productId') productId?: number,
    @Query('variantId') variantId?: number,
  ): Promise<ProductImageEntity[]> {
    if (productId) {
      return this.productImagesService.findByProduct(productId);
    }
    if (variantId) {
      return this.productImagesService.findByVariant(variantId);
    }
    return this.productImagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin hình ảnh sản phẩm theo ID' })
  @ApiParam({ name: 'id', description: 'ID của hình ảnh sản phẩm', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin hình ảnh sản phẩm thành công',
    type: ProductImageEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy hình ảnh sản phẩm',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductImageEntity> {
    return this.productImagesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin hình ảnh sản phẩm' })
  @ApiParam({ name: 'id', description: 'ID của hình ảnh sản phẩm', type: 'number' })
  @ApiBody({ type: UpdateProductImageDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật hình ảnh sản phẩm thành công',
    type: ProductImageEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy hình ảnh sản phẩm',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ): Promise<ProductImageEntity> {
    return this.productImagesService.update(id, updateProductImageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa hình ảnh sản phẩm' })
  @ApiParam({ name: 'id', description: 'ID của hình ảnh sản phẩm', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Xóa hình ảnh sản phẩm thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy hình ảnh sản phẩm',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productImagesService.remove(id);
  }
}
