import { InterviewDto } from "../api/interfaces";
import { InterviewPublicModel } from "./interviewPublic";

export class InterviewModel extends InterviewPublicModel {
    title: string;
    intervieweeName: string;
    authorId: string;
    created: Date;
    updated: Date;

    constructor(params: InterviewDto) {
        super(params);
        const { title, intervieweeName, authorId, created, updated } = params;

        this.title = title;
        this.intervieweeName = intervieweeName;
        this.authorId = authorId;
        this.created = new Date(created);
        this.updated = new Date(updated);
    }
}