import { createContext } from "react";
import { ChatContextInterface } from "./interfaces";

const ChatContext = createContext<ChatContextInterface>({
    users: [],
    currentChat: undefined,
    messages: {},
    addMessage: () => {},
    setCurrentChat: () => {},
    setUserOnline: () => {},
    setUserUnreadMessages: () => {},
    getUserByID: () => undefined,
    getUserByUsername: () => undefined,
    setUsers: () => {},
    setMessages: () => {},
    addUser: () => {},
    removeUser: () => {},
});

export default ChatContext;