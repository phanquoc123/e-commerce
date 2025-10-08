import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateProductVariantDto {
  @ApiProperty({
    description: 'ID sản phẩm',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    description: 'Mã SKU của biến thể',
    example: 'ATN-RED-M',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  sku: string;

  @ApiProperty({
    description: 'Giá của biến thể',
    example: 299000,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Số lượng tồn kho',
    example: 100,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  available?: number;

  @ApiProperty({
    description: 'ID màu sắc',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  colorId: number;

  @ApiProperty({
    description: 'ID size',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  sizeId: number;

  @ApiPropertyOptional({
    description: 'URL hình ảnh biến thể',
    example: 'https://example.com/product-variant.jpg',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  imageUrl?: string;
}
