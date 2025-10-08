import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateColorDto {
  @ApiProperty({
    description: 'Tên màu sắc',
    example: 'Đỏ',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @ApiProperty({
    description: 'Mã màu sắc',
    example: 'red',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  code: string;

  @ApiPropertyOptional({
    description: 'URL hình ảnh màu sắc',
    example: 'https://example.com/red-color.jpg',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  image?: string;
}
