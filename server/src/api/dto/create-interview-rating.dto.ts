import { IsNotEmpty, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { CreateRatingDtoTypeEnum } from '../../shared/clients/codeinterviewService/api';

export class CreateInterviewRatingDto {
  @IsEnum(CreateRatingDtoTypeEnum)
  type: CreateRatingDtoTypeEnum;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.5)
  @Max(5)
  rate: number;
}
