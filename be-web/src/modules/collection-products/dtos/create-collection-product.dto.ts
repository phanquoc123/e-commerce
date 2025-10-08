import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateCollectionProductDto {
  @ApiProperty({
    description: 'ID bộ sưu tập',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  collectionId: number;

  @ApiProperty({
    description: 'ID sản phẩm',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiPropertyOptional({
    description: 'Thứ tự hiển thị',
    example: 0,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  displayOrder?: number;
}
