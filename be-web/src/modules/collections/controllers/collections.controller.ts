import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
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
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bộ sưu tập thành công',
    type: [CollectionEntity],
  })
  findAll(): Promise<CollectionEntity[]> {
    return this.collectionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin bộ sưu tập theo ID' })
  @ApiParam({ name: 'id', description: 'ID của bộ sưu tập', type: 'number' })
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

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin bộ sưu tập' })
  @ApiParam({ name: 'id', description: 'ID của bộ sưu tập', type: 'number' })
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
  @ApiParam({ name: 'id', description: 'ID của bộ sưu tập', type: 'number' })
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
