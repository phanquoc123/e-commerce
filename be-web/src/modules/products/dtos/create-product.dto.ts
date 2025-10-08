import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber, IsBoolean, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'ID danh mục sản phẩm',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({
    description: 'Tên sản phẩm',
    example: 'Áo thun nam',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Slug sản phẩm',
    example: 'ao-thun-nam',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  slug: string;

  @ApiPropertyOptional({
    description: 'Mô tả sản phẩm',
    example: 'Áo thun nam chất liệu cotton cao cấp',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Giá sản phẩm',
    example: 299000,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    description: 'Trạng thái hoạt động',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
