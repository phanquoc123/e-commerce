import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class CategoryDto extends BaseDto {
  @ApiProperty({ description: 'Category name', example: 'Electronics' })
  name: string;

  @ApiProperty({ description: 'Category slug', example: 'electronics' })
  slug: string;

  @ApiProperty({ description: 'Category thumbnail', example: 'https://example.com/thumb.jpg', nullable: true })
  thumbnail: string | null;

  @ApiProperty({ description: 'Parent category ID', example: 1, nullable: true })
  parentId: bigint | null;

  @ApiProperty({ description: 'Is active', example: true })
  isActive: boolean;

  @ApiProperty({ description: 'Sort order', example: 0 })
  sortOrder: number;

  @ApiProperty({ description: 'Parent category', type: () => CategoryDto, nullable: true })
  parent?: CategoryDto | null;

  @ApiProperty({ description: 'Child categories', type: [CategoryDto] })
  children?: CategoryDto[];

  @ApiProperty({ description: 'Products', type: [Object] })
  products?: any[];
}
