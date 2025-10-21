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
import { CollectionsService } from '../services/collections.service';
import { CreateCollectionDto } from '../dtos/create-collection.dto';
import { UpdateCollectionDto } from '../dtos/update-collection.dto';
import { CollectionEntity } from '../entities/collections.entity';

@ApiTags('Collections')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo bộ sưu tập mới' })
  @ApiBody({ type: CreateCollectionDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo bộ sưu tập thành công',
    type: CollectionEntity,
  })
  create(@Body() createCollectionDto: CreateCollectionDto): Promise<CollectionEntity> {
    return this.collectionsService.create(createCollectionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả bộ sưu tập' })
  @ApiQuery({ name: 'includeProducts', required: false, description: 'Bao gồm danh sách sản phẩm', type: 'boolean', example: true })
  @ApiQuery({ name: 'productLimit', required: false, description: 'Giới hạn số sản phẩm mỗi collection', type: 'number', example: 10 })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bộ sưu tập thành công',
    type: [CollectionEntity],
  })
  findAll(
    @Query('includeProducts') includeProducts?: boolean,
    @Query('productLimit') productLimit?: number,
  ) {
    return this.collectionsService.findAll(includeProducts, productLimit);
  }

  @Get('with-products')
  @ApiOperation({ summary: 'Lấy tất cả bộ sưu tập kèm danh sách sản phẩm' })
  @ApiQuery({ name: 'productLimit', required: false, description: 'Giới hạn số sản phẩm mỗi collection', type: 'number', example: 8 })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bộ sưu tập với sản phẩm thành công',
  })
  findAllWithProducts(@Query('productLimit') productLimit?: number) {
    return this.collectionsService.findAllWithProducts(productLimit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin bộ sưu tập theo ID' })
  @ApiParam({ name: 'id', description: 'ID của bộ sưu tập', type: 'number', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin bộ sưu tập thành công',
    type: CollectionEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bộ sưu tập',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CollectionEntity> {
    return this.collectionsService.findOne(id);
  }

  @Get(':id/products')
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm theo bộ sưu tập' })
  @ApiParam({ name: 'id', description: 'ID của bộ sưu tập', type: 'number', example: 1 })
  @ApiQuery({ name: 'page', required: false, description: 'Số trang', type: 'number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Số lượng sản phẩm mỗi trang', type: 'number', example: 12 })
  @ApiQuery({ name: 'search', required: false, description: 'Tìm kiếm theo tên sản phẩm', type: 'string', example: 'áo thun' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách sản phẩm thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bộ sưu tập',
  })
  getProductsByCollection(
    @Param('id', ParseIntPipe) id: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.collectionsService.getProductsByCollection(id, {
      page: page || 1,
      limit: limit || 10,
      search,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin bộ sưu tập' })
  @ApiParam({ name: 'id', description: 'ID của bộ sưu tập', type: 'number', example: 1 })
  @ApiBody({ type: UpdateCollectionDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật bộ sưu tập thành công',
    type: CollectionEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bộ sưu tập',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ): Promise<CollectionEntity> {
    return this.collectionsService.update(id, updateCollectionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa bộ sưu tập' })
  @ApiParam({ name: 'id', description: 'ID của bộ sưu tập', type: 'number', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Xóa bộ sưu tập thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bộ sưu tập',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.collectionsService.remove(id);
  }
}
