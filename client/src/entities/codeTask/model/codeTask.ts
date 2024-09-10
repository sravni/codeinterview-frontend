import { LANGUAGES } from "../../../shared/consts/languages";
import { CodeTaskDto } from "../api/interfaces";

export class CodeTaskModel {
    id: string;
    authorId: string;
    title: string;
    code: string;
    answer: string | undefined;
    language: LANGUAGES
    created: Date;
    updated: Date;

    constructor(params: CodeTaskDto) {
        const { id, title, language, authorId, code, answer, created, updated } = params;

        this.id = id;
        this.title = title;
        this.language = language;
        this.authorId = authorId;
        this.code = code;
        this.answer = answer === null ? undefined : answer;
        this.created = new Date(created);
        this.updated = new Date(updated);
    }
}