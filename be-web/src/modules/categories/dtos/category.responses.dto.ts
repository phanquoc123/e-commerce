import { PaginationDto, ResponseBase } from 'src/common/dtos/base-response.dto';
import { CategoryDto } from './category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDTO extends ResponseBase {
  @ApiProperty()
  declare data?: CategoryDto;
}

export class SearchCategoryResponseDTO extends PaginationDto {
  @ApiProperty({ type: [CategoryDto] })
  declare data?: CategoryDto[];
}
