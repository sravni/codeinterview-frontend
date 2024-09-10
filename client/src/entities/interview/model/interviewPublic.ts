import { LANGUAGES } from "../../../shared/consts/languages";
import { STATUSES } from "../consts";

import { InterviewPublicDto } from "../api/interfaces";

export class InterviewPublicModel {
    id: string;
    language: LANGUAGES;
    status: STATUSES;
    code: string;

    constructor(params: InterviewPublicDto) {
        const { id, language, status, code, } = params;

        this.id = id;
        this.language = language;
        this.status = status;
        this.code = code;
    }
}