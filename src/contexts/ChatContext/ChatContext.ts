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
    setChatOnline: () => {},
    setUsers: () => {},
    addUser: () => {},
    removeUser: () => {},
});

export default ChatContext;