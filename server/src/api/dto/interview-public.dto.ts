import { Expose } from 'class-transformer';
import {
  InterviewDto,
  InterviewDtoLanguageEnum,
  InterviewDtoStatusEnum,
} from '../../shared/clients/codeinterviewService/api';

export class InterviewPublicDto
  implements Pick<InterviewDto, 'status' | 'code' | 'id' | 'language'>
{
  @Expose()
  id: string;
  @Expose()
  language: InterviewDtoLanguageEnum;
  @Expose()
  code: string;
  @Expose()
  status: InterviewDtoStatusEnum;
}
