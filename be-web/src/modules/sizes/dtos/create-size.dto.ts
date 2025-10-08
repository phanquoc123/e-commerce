import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateSizeDto {
  @ApiProperty({
    description: 'Tên size',
    example: 'M',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  name: string;
}
