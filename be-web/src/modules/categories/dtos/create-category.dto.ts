import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Shoes' })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 1, description: 'Parent category id' })
  @IsOptional()
  @IsInt()
  @Min(1)
  parent_id?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  sort_order?: number;

  @ApiPropertyOptional({ 
    example: 'https://example.com/category-thumbnail.jpg',
    description: 'URL of the category thumbnail image'
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  thumbnail?: string;
}


