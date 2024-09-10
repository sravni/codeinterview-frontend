import urlJoin from "url-join";
import { BffApi } from "../../../shared/api/bff";
import { UserModel } from "../model/user";
import { UserDto } from "./interfaces";

export class UserApi extends BffApi {
    static async getUser(userId: string): Promise<UserModel> {
        const url = urlJoin(this._url.toString(), `/users/${userId}`);

        const response = await this._httpClient.get<UserDto>(url);

        return new UserModel(response.data);
    }
}