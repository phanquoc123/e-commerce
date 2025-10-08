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
import { SizesService } from '../services/sizes.service';
import { CreateSizeDto } from '../dtos/create-size.dto';
import { UpdateSizeDto } from '../dtos/update-size.dto';
import { SizeEntity } from '../entities/sizes.entity';

@ApiTags('Sizes')
@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo size mới' })
  @ApiBody({ type: CreateSizeDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo size thành công',
    type: SizeEntity,
  })
  create(@Body() createSizeDto: CreateSizeDto): Promise<SizeEntity> {
    return this.sizesService.create(createSizeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả size' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách size thành công',
    type: [SizeEntity],
  })
  findAll(): Promise<SizeEntity[]> {
    return this.sizesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin size theo ID' })
  @ApiParam({ name: 'id', description: 'ID của size', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin size thành công',
    type: SizeEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy size',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SizeEntity> {
    return this.sizesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin size' })
  @ApiParam({ name: 'id', description: 'ID của size', type: 'number' })
  @ApiBody({ type: UpdateSizeDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật size thành công',
    type: SizeEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy size',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSizeDto: UpdateSizeDto,
  ): Promise<SizeEntity> {
    return this.sizesService.update(id, updateSizeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa size' })
  @ApiParam({ name: 'id', description: 'ID của size', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Xóa size thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy size',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.sizesService.remove(id);
  }
}
