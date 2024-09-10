import { RatingDto } from "../api/interfaces";
import { RATING_TYPE } from "../consts";

export class RatingModel {
  id: string;
  authorId: string;
  interviewId: string;
  type: RATING_TYPE;
  rate: number;

  constructor(params: RatingDto) {
    const { id, authorId, interviewId, type, rate } = params;
    
    this.id = id;
    this.authorId = authorId;
    this.interviewId = interviewId;
    this.type = type;
    this.rate = rate;
  }
}