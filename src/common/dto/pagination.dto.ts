import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  limit?: number;

  @IsOptional()
  @Min(0)
  offset?: number;
}
