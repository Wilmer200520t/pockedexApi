import { IsInt, IsPositive, IsString, Length, Min } from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;

  @IsString()
  @Length(2)
  name: string;
}
