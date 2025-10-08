import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsBoolean } from 'class-validator';

export class CreateCollectionDto {
  @ApiProperty({
    description: 'Tên bộ sưu tập',
    example: 'Bộ sưu tập mùa hè',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Slug bộ sưu tập',
    example: 'bo-suu-tap-mua-he',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  slug: string;

  @ApiPropertyOptional({
    description: 'Mô tả bộ sưu tập',
    example: 'Bộ sưu tập thời trang mùa hè 2024',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'URL hình ảnh đại diện',
    example: 'https://example.com/collection-thumbnail.jpg',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  thumbnail?: string;

  @ApiPropertyOptional({
    description: 'Trạng thái hoạt động',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
