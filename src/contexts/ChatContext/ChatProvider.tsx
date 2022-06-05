import React, { useState, useCallback, FC, PropsWithChildren } from "react";
import ChatContext from "./ChatContext";
import { ChatContextUser, CurChatIDType } from "./interfaces";

const ChatProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [ curChatID, setCurChatID ] = useState<CurChatIDType>(null);
    const [users, setUsers] = useState<ChatContextUser[]>([]);
    const addUser = useCallback((userID: string, username: string) => {
        setUsers(prev => {
            if (!prev.find(user => user.id === userID)) {
                return [
                    ...prev,
                    {
                        id: userID,
                        username,
                    }
                ]
            }
            return prev;
        });
    }, [ setUsers ]);
    const removeUser = useCallback((userID: string) => {
        setUsers(prev => prev.filter(user => user.id !== userID));
    }, [ setUsers ]);

    return (
        <ChatContext.Provider
            value={
                {
                    users,
                    curChatID,
                    setCurChatID,
                    setUsers,
                    addUser,
                    removeUser,
                }
            }
        >
            { children }
        </ChatContext.Provider>
    );
}

export default ChatProvider;