import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class UpdateInterviewRatingDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0.5)
  @Max(5)
  rate: number;
}
