import { IsOptional, IsString } from 'class-validator';
import { PaginationParamsDto } from './pagination.dto';

export class SearchDto extends PaginationParamsDto {
  @IsString()
  @IsOptional()
  keyword?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsString()
  @IsOptional()
  order?: string = 'DESC';
}
