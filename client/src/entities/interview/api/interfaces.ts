
import { LANGUAGES } from "../../../shared/consts/languages";
import { PaginationParams } from "../../../shared/interfaces/paginated";
import { RATING_TYPE, STATUSES } from "../consts";

export type CreateInterviewParams = {
  title: string;
  intervieweeName: string;
  language: LANGUAGES;
  status: STATUSES;
}

export type GetInterviewsParams = PaginationParams & {
  title?: string;
  intervieweeName?: string;
  language?: LANGUAGES;
  status?: STATUSES;    
  order?: string | string[];
}

export type UpdateInterviewParams = Partial<CreateInterviewParams>;

export interface InterviewDto extends InterviewPublicDto {
  /** Название */
  title: string;
  /** Имя кандидата */
  intervieweeName: string;
  /** ID автора */
  authorId: string;
  /** Дата создания */
  created: string;
  /** Дата обновления */
  updated: string;
}

export interface InterviewPublicDto {
  /** ID интервью */
  id: string;
  /** Код */
  code: string;
  /** Язык программирования */
  language: LANGUAGES;
  /** Статус интервью */
  status: STATUSES;
}

export interface RatingDto {
  id: string;
  authorId: string;
  interviewId: string;
  type: RATING_TYPE;
  rate: number;
}

export interface RatingAverageDto {
  /** Список ID пользователь, чьи оценки участвовали в расчете */
  authors: string[];
  /** Средняя оценка */
  summary: number;
  /** Средняя оценка по каждому типу */
  details:  {
    algorithms?: number;
    basicKnowledge?: number;
    codeQuality?: number;
    communication?: number;
    decompose?: number;
    design?: number;
    reasoning?: number;
    }
}

export interface CreateInterviewRatingParams {
  type: RATING_TYPE;
  rate: number;
}

export interface UpdateInterviewRatingParams extends Pick<CreateInterviewRatingParams, 'rate'> { };