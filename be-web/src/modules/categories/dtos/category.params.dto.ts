import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { SearchDto } from 'src/common/dtos/search.dto';

export class CreateCategoryParamsDto {
  @ApiProperty({ example: 'Electronics', maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ 
    nullable: true, 
    example: 'https://example.com/category-thumbnail.jpg',
    maxLength: 500 
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  thumbnail?: string | null;

  @ApiPropertyOptional({ nullable: true, example: 1 })
  @IsOptional()
  @IsNumber()
  parentId?: number | null;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class UpdateCategoryParamsDto {
  @ApiPropertyOptional({ example: 'Electronics', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({ 
    nullable: true, 
    example: 'https://example.com/category-thumbnail.jpg',
    maxLength: 500 
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  thumbnail?: string | null;

  @ApiPropertyOptional({ nullable: true, example: 1 })
  @IsOptional()
  @IsNumber()
  parentId?: number | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class SearchCategoryDto extends SearchDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  parentId?: number | null;
}
