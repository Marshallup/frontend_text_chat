import { createContext } from "react";
import { ChatContextInterface } from "./interfaces";

const ChatContext = createContext<ChatContextInterface>({
    users: [],
    currentChat: {
        chatID: null,
        username: null,
        isUserOnline: false,
    },
    messages: {},
    addMessage: () => {},
    setCurrentChat: () => {},
    setUserOnline: () => {},
    updateChatIDOnline: () => {},
    setUsers: () => {},
    addUser: () => {},
    removeUser: () => {},
});

export default ChatContext;