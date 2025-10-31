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
import { ProductVariantsService } from '../services/product-variants.service';
import { CreateProductVariantDto } from '../dtos/create-product-variant.dto';
import { UpdateProductVariantDto } from '../dtos/update-product-variant.dto';
import { ProductVariantEntity } from '../entities/product-variants.entity';

@ApiTags('Product Variants')
@Controller('product-variants')
export class ProductVariantsController {
  constructor(private readonly productVariantsService: ProductVariantsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo biến thể sản phẩm mới' })
  @ApiBody({ type: CreateProductVariantDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo biến thể sản phẩm thành công',
    type: ProductVariantEntity,
  })
  create(@Body() createProductVariantDto: CreateProductVariantDto): Promise<ProductVariantEntity> {
    return this.productVariantsService.create(createProductVariantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả biến thể sản phẩm' })
  @ApiQuery({
    name: 'productId',
    required: false,
    description: 'Lọc theo sản phẩm',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách biến thể sản phẩm thành công',
    type: [ProductVariantEntity],
  })
  findAll(@Query('productId') productId?: number): Promise<ProductVariantEntity[]> {
    if (productId) {
      return this.productVariantsService.findByProduct(productId);
    }
    return this.productVariantsService.findAll();
  }

  @Get('product/:slug')
  @ApiOperation({ summary: 'Lấy chi tiết sản phẩm đầy đủ (bao gồm màu, ảnh, sizes, variants)' })
  @ApiParam({ name: 'slug', description: 'Slug của sản phẩm', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Lấy chi tiết sản phẩm thành công',
    schema: {
      example: {
        id: 1,
        name: 'Áo thun nam basic cotton Premium',
        slug: 'ao-thun-nam-basic-cotton-premium',
        description: 'Áo thun nam chất liệu cotton 100% cao cấp',
        price: 199000,
        salePrice: 149000,
        discountPercent: 25,
        isActive: true,
        category: {
          id: 1,
          name: 'Áo thun nam',
          slug: 'ao-thun-nam',
        },
        colors: [
          {
            id: 1,
            name: 'Đen',
            code: 'black',
            hexCode: '#000000',
            thumbnailUrl: 'https://...',
            productColorId: 1,
            images: [
              {
                id: 1,
                imageUrl: 'https://...',
                isMain: true,
                sortOrder: 1,
              },
            ],
            sizes: [
              {
                id: 1,
                name: 'M',
                code: 'm',
              },
            ],
            variants: [
              {
                id: 1,
                sku: 'ATN-BLACK-M',
                price: 199000,
                stock: 50,
                status: 'active',
                sizeId: 1,
                sizeName: 'M',
                sizeCode: 'm',
              },
            ],
          },
        ],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy sản phẩm',
  })
  getProductDetail(@Param('slug') slug: string) {
    return this.productVariantsService.getProductDetail(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin biến thể sản phẩm theo ID' })
  @ApiParam({ name: 'id', description: 'ID của biến thể sản phẩm', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin biến thể sản phẩm thành công',
    type: ProductVariantEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy biến thể sản phẩm',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductVariantEntity> {
    return this.productVariantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin biến thể sản phẩm' })
  @ApiParam({ name: 'id', description: 'ID của biến thể sản phẩm', type: 'number' })
  @ApiBody({ type: UpdateProductVariantDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật biến thể sản phẩm thành công',
    type: ProductVariantEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy biến thể sản phẩm',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductVariantDto: UpdateProductVariantDto,
  ): Promise<ProductVariantEntity> {
    return this.productVariantsService.update(id, updateProductVariantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa biến thể sản phẩm' })
  @ApiParam({ name: 'id', description: 'ID của biến thể sản phẩm', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Xóa biến thể sản phẩm thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy biến thể sản phẩm',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productVariantsService.remove(id);
  }
}
