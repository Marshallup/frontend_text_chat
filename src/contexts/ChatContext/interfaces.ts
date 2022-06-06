import { ChatMessage } from "../../components/Chat/interface";
import { MessageSide } from "../../components/Messages/interfaces";

export type GetChatID = string | undefined;
export type ChatContextUser = {
    id: string,
    username: string,
};
export type AddMessageType = (text: string, id: string, type: MessageSide, getChatID?: GetChatID) => void;
export type ChatContextMessages = {
    [clientID: string]: ChatMessage[],
}
export interface CurrentChat {
    chatID: string | null,
    username: string | null,
    isUserOnline: boolean,
};

export interface ChatContextInterface {
    currentChat: CurrentChat,
    users: ChatContextUser[],
    messages: ChatContextMessages,
    addMessage: AddMessageType,
    setUsers: (users: ChatContextUser[]) => void,
    addUser: (userID: ChatContextUser['id'], username: ChatContextUser['username']) => void,
    setCurrentChat: (chatID: CurrentChat['chatID'], username: CurrentChat['username'], isUserOnline?: CurrentChat['isUserOnline']) => void,
    updateChatIDOnline: (chatID: CurrentChat['chatID'], isUserOnline?: CurrentChat['isUserOnline']) => void,
    setUserOnline: (isUserOnline: boolean) => void,
    removeUser: (userID: string) => void,
}