import urlJoin from "url-join";

import { BffApi } from "../../../shared/api/bff";
import { InterviewModel, InterviewPublicModel } from "../../../entities/interview";
import type { InterviewDto, InterviewPublicDto } from "../../../entities/interview";

export class InterviewRoomApi extends BffApi { 
    static async getInterviewForRoom(id: string): Promise<InterviewModel | InterviewPublicModel> {
        const url = urlJoin(this._url.toString(), `/interviews/${id}/room`);
        const response = await this._httpClient.get<InterviewDto | InterviewPublicDto>(url);
        
        const { data } = response;

        if (data.hasOwnProperty('id') && data.hasOwnProperty('authorId')) return new InterviewModel(data as InterviewDto);

        return new InterviewPublicModel(data as InterviewPublicDto);
    }
}