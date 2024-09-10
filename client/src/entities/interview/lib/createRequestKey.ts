import { InterviewModel } from "../model/interview";

export const generateInterviewsCommonRequestKey = () => ['interviews'];
export const generateInterviewDetailsRequestKey = (interviewId: InterviewModel['id']) => ['interviews', interviewId];
