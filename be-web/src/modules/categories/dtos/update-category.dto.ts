import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'Sneakers' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({ example: null, description: 'Set to number or null' })
  @IsOptional()
  @IsInt()
  @Min(1)
  parent_id?: number | null;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({ example: 10 })
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
  thumbnail?: string | null;
}


