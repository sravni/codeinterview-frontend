import { hashStringToNumber } from "../../../shared/lib/hashString";
import { UserDto } from "../api/interfaces";

const COLORS = ["blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "lime", "gold"];

export class UserModel {
    id: string;
    
    displayName: string;

    email?: string;
    photo?: string;
    isAdmin?: boolean;

    constructor(params: UserDto) {
        const { id, email, displayName, photo, isAdmin } = params;

        this.id = id;
        this.displayName = displayName;
        
        this.email = email;
        this.photo = photo;
        this.isAdmin = isAdmin;
    }

    get color() {
        const hash = hashStringToNumber(this.id);

        return COLORS[hash % COLORS.length];
    }
}