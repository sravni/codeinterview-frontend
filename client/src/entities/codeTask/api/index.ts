import urlJoin from "url-join";
import { BffApi } from "../../../shared/api/bff";
import { Paginated } from "../../../shared/interfaces/paginated";
import { CodeTaskModel } from "../model/codeTask";
import { CreateCodeTaskParams, GetCodeTasksParams, CodeTaskDto, UpdateCodeTaskParams } from "./interfaces";

export class CodeTaskApi extends BffApi { 
    static async createCodeTask(params: CreateCodeTaskParams): Promise<CodeTaskModel> {
        const url = urlJoin(this._url.toString(), "/codeTasks");
        const response = await this._httpClient.post<CodeTaskDto>(url, params);
        return new CodeTaskModel(response.data);
    }

    static async getCodeTask(id: string): Promise<CodeTaskModel> {
        const url = urlJoin(this._url.toString(), `/codeTasks/${id}`);
        const response = await this._httpClient.get<CodeTaskDto>(url);
        
       return new CodeTaskModel(response.data);
    }

    static async removeCodeTask(id: string): Promise<void> {
        const url = urlJoin(this._url.toString(), `/codeTasks/${id}`);
        await this._httpClient.delete<void>(url);
    }

    static async updateCodeTask(id: string, params: UpdateCodeTaskParams): Promise<CodeTaskModel> {
        const url = urlJoin(this._url.toString(), `/codeTasks/${id}`);
        const response = await this._httpClient.patch<CodeTaskDto>(url, params);
        return new CodeTaskModel(response.data);
    }
    
    static async getCodeTasks(params: GetCodeTasksParams): Promise<Paginated<CodeTaskModel>> {
        const url = urlJoin(this._url.toString(), "/codeTasks");
        const response = await this._httpClient.get<Paginated<CodeTaskDto>>(url, { params });
        const { items, total } = response.data;

        return {
            items: items.map(codeTask => new CodeTaskModel(codeTask)),
            total
        }
    }
}