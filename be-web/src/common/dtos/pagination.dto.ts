import { IsNumber, IsOptional } from 'class-validator';
import { IsStringOrNumber } from 'src/core/decorators/validator.decorator';

export class PaginationParamsDto {
  @IsStringOrNumber()
  @IsOptional()
  page?: number = 1;

  @IsStringOrNumber()
  @IsOptional()
  limit?: number = 100;

  @IsStringOrNumber()
  @IsOptional()
  skip?: number;

  @IsStringOrNumber()
  @IsOptional()
  take?: number;
}

export class PaginationResponseDto {
  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;

  @IsNumber()
  total: number;
}
