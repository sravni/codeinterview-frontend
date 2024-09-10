import { UserModel } from "../../user";
import { TerminalMessageDto } from "../api/interfaces";
import { TYPE } from "../consts";

type Data = {
    output: string | null;
    error: string | null;
    duration: number; // ms
};

export class TerminalMessageModel {
    user: UserModel;
    type: TYPE;
    data?: Data;

    constructor(params: TerminalMessageDto) {
        const { user, type, data } = params;

        this.user = new UserModel(user);
        this.type = type;
        this.data = data;
    }
}