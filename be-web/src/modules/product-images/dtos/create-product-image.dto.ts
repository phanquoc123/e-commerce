import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateProductImageDto {
  @ApiProperty({
    description: 'ID màu sắc sản phẩm',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  productColorId: number;

  @ApiProperty({
    description: 'URL hình ảnh',
    example: 'https://example.com/product-image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  imageUrl: string;

  @ApiPropertyOptional({
    description: 'Đánh dấu ảnh đại diện',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isMain?: boolean;

  @ApiPropertyOptional({
    description: 'Thứ tự sắp xếp',
    example: 0,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
