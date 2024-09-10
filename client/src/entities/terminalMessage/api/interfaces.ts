import { UserDto } from "../../user/api/interfaces";
import { TYPE } from "../consts";

export interface TerminalMessageDto {
    user: UserDto;
    type: TYPE;
    data?: {
        output: string | null;
        error: string | null;
        duration: number; // ms
    }
}
