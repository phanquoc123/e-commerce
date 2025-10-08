import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateProductImageDto {
  @ApiProperty({
    description: 'ID sản phẩm',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiPropertyOptional({
    description: 'ID biến thể sản phẩm (nếu ảnh dành riêng cho biến thể)',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  variantId?: number;

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
}
