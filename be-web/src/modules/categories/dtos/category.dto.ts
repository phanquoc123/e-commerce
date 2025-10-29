import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  thumbnail: string | null;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  parentId: number | null;

  @ApiProperty({ default: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ default: 0 })
  @IsNumber()
  sortOrder: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
