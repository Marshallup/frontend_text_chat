import { AuthContextInterface } from "../../contexts/AuthContext/interfaces";
import { ChatContextMessages, ChatContextUser } from "../../contexts/ChatContext";

export interface CurrentUserDB {
    id?: number,
    currentUser?: AuthContextInterface['userInfo'],
}
export interface MessagesDB {
    id?: number,
    messages?: ChatContextMessages,
}
export interface UsersDB {
    id?: number,
    users: ChatContextUser[],
}