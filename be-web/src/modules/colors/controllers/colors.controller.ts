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
import { ColorsService } from '../services/colors.service';
import { CreateColorDto } from '../dtos/create-color.dto';
import { UpdateColorDto } from '../dtos/update-color.dto';
import { ColorEntity } from '../entities/colors.entity';

@ApiTags('Colors')
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo màu sắc mới' })
  @ApiBody({ type: CreateColorDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo màu sắc thành công',
    type: ColorEntity,
  })
  create(@Body() createColorDto: CreateColorDto): Promise<ColorEntity> {
    return this.colorsService.create(createColorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả màu sắc' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách màu sắc thành công',
    type: [ColorEntity],
  })
  findAll(): Promise<ColorEntity[]> {
    return this.colorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin màu sắc theo ID' })
  @ApiParam({ name: 'id', description: 'ID của màu sắc', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin màu sắc thành công',
    type: ColorEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy màu sắc',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ColorEntity> {
    return this.colorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin màu sắc' })
  @ApiParam({ name: 'id', description: 'ID của màu sắc', type: 'number' })
  @ApiBody({ type: UpdateColorDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật màu sắc thành công',
    type: ColorEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy màu sắc',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateColorDto: UpdateColorDto,
  ): Promise<ColorEntity> {
    return this.colorsService.update(id, updateColorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa màu sắc' })
  @ApiParam({ name: 'id', description: 'ID của màu sắc', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Xóa màu sắc thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy màu sắc',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.colorsService.remove(id);
  }
}
