import { ChatMessage } from "../../components/Chat/interface";
import { MessageSide } from "../../components/Messages/interfaces";

export type UnreadMessagesOpt = {
    count?: number,
    inc?: boolean,
    dec?: boolean,
    checkCurrentUser?: boolean,
}
export type GetChatID = string | undefined;
export type ChatContextUser = {
    id: string,
    username: string,
    unreadMessages: number,
    isChat: boolean,
    isOnline: boolean,
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
    currentChat: ChatContextUser | undefined,
    users: ChatContextUser[],
    messages: ChatContextMessages,
    addMessage: AddMessageType,
    setUsers: (users: ChatContextUser[]) => void,
    addUser: (userID: ChatContextUser['id'], username: ChatContextUser['username']) => void,
    setUserUnreadMessages: (
        id: string,
        opt: UnreadMessagesOpt) => void,
    setCurrentChat: (chatID: string, username: string, isUserOnline?: CurrentChat['isUserOnline']) => void,
    setChatOnline: (chatID: ChatContextUser['id'], isOnline?: ChatContextUser['isOnline']) => void,
    setUserOnline: (id: string, isUserOnline: boolean) => void,
    getUserByID: (id: string) => ChatContextUser | undefined,
    getUserByUsername: (username: string) => ChatContextUser | undefined,
    removeUser: (userID: string) => void,
}