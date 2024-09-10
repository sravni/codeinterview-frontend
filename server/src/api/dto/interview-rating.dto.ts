import { Expose } from 'class-transformer';

import { RatingDtoTypeEnum } from '../../shared/clients/codeinterviewService/api';

export class RatingDto {
  @Expose()
  id: string;

  @Expose()
  authorId: string;

  @Expose()
  interviewId: string;

  @Expose()
  type: RatingDtoTypeEnum;

  @Expose()
  rate: number;
}
