import urlJoin from "url-join";

import { BffApi } from "../../../shared/api/bff";

import { CreateInterviewParams, UpdateInterviewParams, GetInterviewsParams, InterviewDto, RatingAverageDto, CreateInterviewRatingParams, UpdateInterviewRatingParams, RatingDto, InterviewPublicDto } from "./interfaces";
import { InterviewModel } from "../model/interview";
import { Paginated } from "../../../shared/interfaces/paginated";
import { RatingAverageModel } from "../model/ratingAverage";
import { RatingModel } from "../model/rating";
import { InterviewPublicModel } from "../model/interviewPublic";

export class InterviewApi extends BffApi { 
    static async createInterview(params: CreateInterviewParams): Promise<InterviewModel> {
        const url = urlJoin(this._url.toString(), "/interviews");
        const response = await this._httpClient.post<InterviewDto>(url, params);
        return new InterviewModel(response.data);
    }

    static async getInterview(id: string): Promise<InterviewModel> {
        const url = urlJoin(this._url.toString(), `/interviews/${id}`);
        const response = await this._httpClient.get<InterviewDto>(url);
        
       return new InterviewModel(response.data);
    }

    static async updateInterview(id: string, params: UpdateInterviewParams): Promise<InterviewModel> {
        const url = urlJoin(this._url.toString(), `/interviews/${id}`);
        const response = await this._httpClient.patch<InterviewDto>(url, params);
        return new InterviewModel(response.data);
    }

    static async removeInterview(id: string): Promise<void> {
        const url = urlJoin(this._url.toString(), `/interviews/${id}`);
        await this._httpClient.delete<void>(url);
    }
    
    static async getInterviewRatingAverage(interviewId: string): Promise<RatingAverageModel> {
        const url = urlJoin(this._url.toString(), `/interviews/${interviewId}/ratings/average`);

        const response = await this._httpClient.get<RatingAverageDto>(url);

        return new RatingAverageModel(response.data);
    }

    static async createInterviewRating(interviewId: string, params: CreateInterviewRatingParams): Promise<RatingModel> {
        const url = urlJoin(this._url.toString(), `/interviews/${interviewId}/ratings`);

        const response = await this._httpClient.post<RatingDto>(url, params);
        
        return new RatingModel(response.data);
    }

    static async updateInterviewRating(interviewId: string, ratingId: string, params: UpdateInterviewRatingParams): Promise<RatingModel> {
        const url = urlJoin(this._url.toString(), `/interviews/${interviewId}/ratings/${ratingId}`);

        const response = await this._httpClient.patch<RatingDto>(url, params);

        return new RatingModel(response.data);
    }

    static async removeInterviewRating(interviewId: string, ratingId: string): Promise<void> {
        const url = urlJoin(this._url.toString(), `/interviews/${interviewId}/ratings/${ratingId}`);
        await this._httpClient.delete<void>(url);
    }

    static async getInterviewRatings(interviewId: string) {
        const url = urlJoin(this._url.toString(), `/interviews/${interviewId}/ratings`);

        const response = await this._httpClient.get<RatingDto[]>(url);

        return response.data.map((dto) => new RatingModel(dto));
    }

    static async getInterviews(params: GetInterviewsParams): Promise<Paginated<InterviewModel>> {
        const url = urlJoin(this._url.toString(), "/interviews");
        const response = await this._httpClient.get<Paginated<InterviewDto>>(url, { params });
        const { items, total } = response.data;

        return {
            items: items.map(interview => new InterviewModel(interview)),
            total
        }
    }

    static async getInterviewForRoom(id: string): Promise<InterviewModel | InterviewPublicModel> {
        const url = urlJoin(this._url.toString(), `/interviews/${id}/room`);
        const response = await this._httpClient.get<InterviewDto | InterviewPublicDto>(url);
        
        const { data } = response;

        if (data.hasOwnProperty('id') && data.hasOwnProperty('authorId')) return new InterviewModel(data as InterviewDto);

        return new InterviewPublicModel(data as InterviewPublicDto);
    }
}