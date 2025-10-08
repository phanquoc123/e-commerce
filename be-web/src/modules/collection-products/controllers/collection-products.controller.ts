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
import { CollectionProductsService } from '../services/collection-products.service';
import { CreateCollectionProductDto } from '../dtos/create-collection-product.dto';
import { UpdateCollectionProductDto } from '../dtos/update-collection-product.dto';
import { CollectionProductEntity } from '../entities/collection-products.entity';

@ApiTags('Collection Products')
@Controller('collection-products')
export class CollectionProductsController {
  constructor(private readonly collectionProductsService: CollectionProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Thêm sản phẩm vào bộ sưu tập' })
  @ApiBody({ type: CreateCollectionProductDto })
  @ApiResponse({
    status: 201,
    description: 'Thêm sản phẩm vào bộ sưu tập thành công',
    type: CollectionProductEntity,
  })
  create(@Body() createCollectionProductDto: CreateCollectionProductDto): Promise<CollectionProductEntity> {
    return this.collectionProductsService.create(createCollectionProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả sản phẩm trong bộ sưu tập' })
  @ApiQuery({
    name: 'collectionId',
    required: false,
    description: 'Lọc theo bộ sưu tập',
    type: Number,
  })
  @ApiQuery({
    name: 'productId',
    required: false,
    description: 'Lọc theo sản phẩm',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách sản phẩm trong bộ sưu tập thành công',
    type: [CollectionProductEntity],
  })
  findAll(
    @Query('collectionId') collectionId?: number,
    @Query('productId') productId?: number,
  ): Promise<CollectionProductEntity[]> {
    if (collectionId) {
      return this.collectionProductsService.findByCollection(collectionId);
    }
    if (productId) {
      return this.collectionProductsService.findByProduct(productId);
    }
    return this.collectionProductsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin sản phẩm trong bộ sưu tập theo ID' })
  @ApiParam({ name: 'id', description: 'ID của sản phẩm trong bộ sưu tập', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin sản phẩm trong bộ sưu tập thành công',
    type: CollectionProductEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy sản phẩm trong bộ sưu tập',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CollectionProductEntity> {
    return this.collectionProductsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin sản phẩm trong bộ sưu tập' })
  @ApiParam({ name: 'id', description: 'ID của sản phẩm trong bộ sưu tập', type: 'number' })
  @ApiBody({ type: UpdateCollectionProductDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật sản phẩm trong bộ sưu tập thành công',
    type: CollectionProductEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy sản phẩm trong bộ sưu tập',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCollectionProductDto: UpdateCollectionProductDto,
  ): Promise<CollectionProductEntity> {
    return this.collectionProductsService.update(id, updateCollectionProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa sản phẩm khỏi bộ sưu tập' })
  @ApiParam({ name: 'id', description: 'ID của sản phẩm trong bộ sưu tập', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Xóa sản phẩm khỏi bộ sưu tập thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy sản phẩm trong bộ sưu tập',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.collectionProductsService.remove(id);
  }
}
