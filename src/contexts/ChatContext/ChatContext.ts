import { createContext } from "react";
import { ChatContextInterface } from "./interfaces";

const ChatContext = createContext<ChatContextInterface>({
    users: [],
    curChatID: null,
    setCurChatID: () => {},
    setUsers: () => {},
    addUser: () => {},
    removeUser: () => {},
});

export default ChatContext;