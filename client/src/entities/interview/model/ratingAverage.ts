import { RatingAverageDto } from "../api/interfaces";
import { RATING_TYPE } from "../consts";

export class RatingAverageModel {
  /** Список ID пользователь, чьи оценки участвовали в расчете */
  authors: string[];
  /** Средняя оценка */
  summary: number;
  /** Средняя оценка по каждому типу */
  details: {
    [RATING_TYPE.ALGORITHMS]?: number;
    [RATING_TYPE.BASICKNOWLEDGE]?: number;
    [RATING_TYPE.CODEQUALITY]?: number;
    [RATING_TYPE.COMMUNICATION]?: number;
    [RATING_TYPE.DECOMPOSE]?: number;
    [RATING_TYPE.DESIGN]?: number;
    [RATING_TYPE.REASONING]?: number;
  }
    
    constructor(params: RatingAverageDto) {
        const { authors, summary, details } = params;
        this.authors = authors;
        this.summary = summary;
        this.details = details;
    }
}