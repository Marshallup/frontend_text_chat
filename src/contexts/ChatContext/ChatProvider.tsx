import React, { useState, useCallback, FC, PropsWithChildren } from "react";
import uniqid from 'uniqid';
import { MessageSide } from "../../components/Messages/interfaces";
import ChatContext from "./ChatContext";
import {
    AddMessageType,
    ChatContextMessages,
    ChatContextUser,
    GetChatID,
    CurrentChat,
} from "./interfaces";

const ChatProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [ currentChat, setCurrentChat ] = useState<CurrentChat>({
        chatID: null,
        username: null,
        isUserOnline: false,
    });
    const [ users, setUsers ] = useState<ChatContextUser[]>([]);
    const [ messages, setMessages ] = useState<ChatContextMessages>({});
    const updateCurrentChat = useCallback(
        (
            chatID: CurrentChat['chatID'],
            username: CurrentChat['username'],
            isUserOnline: boolean = true
        ) => {
            setCurrentChat({
                chatID,
                username,
                isUserOnline,
            });
        },
        [],
    );
    const updateChatIDOnline = useCallback((chatID: CurrentChat['chatID'], isUserOnline: boolean = true) => {
        setCurrentChat(prevValue => ({
            ...prevValue,
            chatID,
            isUserOnline,
        }))
    }, []);
    const setUserOnline = useCallback((isUserOnline: boolean) => {
        setCurrentChat(prevValue => ({
            ...prevValue,
            isUserOnline,
        }))
    }, []);
    const textMessageObject = useCallback((id: string, text: string, type: MessageSide) => ({
        messageID: uniqid(),
        clientID: id,
        data: [
            {
                id: uniqid(),
                text,
            }
        ],
        type,
    }), []);
    const addMessage = useCallback<AddMessageType>(
        (
            text: string,
            id: string,
            type: MessageSide,
            getChatID: GetChatID,
        ) => {
            setMessages(prevValue => {
                const chatID = getChatID || currentChat.username;

                if (chatID) {
                    if (prevValue[chatID]?.length) {
                        const lastIdxMessages = prevValue[chatID].length - 1;

                        if (prevValue[chatID][lastIdxMessages]?.clientID === id) {
                            return {
                                ...prevValue,
                                [chatID]: [
                                    ...prevValue[chatID].map((prevMessage, idx) => {
                                        if (idx === lastIdxMessages) {
                                            return {
                                                ...prevMessage,
                                                data: [
                                                    ...prevMessage.data,
                                                    {
                                                        id: uniqid(),
                                                        text,
                                                    }
                                                ]
                                            }
                                        }

                                        return prevMessage;
                                    }),

                                ]
                            }
                        }

                        return {
                            ...prevValue,
                            [chatID]: [
                                ...prevValue[chatID],
                                { ...textMessageObject(id, text, type) },
                            ]
                        }

                    }
                    
                    return {
                        ...prevValue,
                        [chatID]: [
                            { ...textMessageObject(id, text, type) },
                        ]
                    }
                }

                return prevValue;
            })
        },
        [ currentChat.username, setMessages, textMessageObject, ],
    );
    const addUser = useCallback((userID: string, username: string) => {
        setUsers(prev => {
            if (prev.find(user => user.username === username)) {
                return prev.map(userInfo => {
                    if (userInfo.username === username) {
                        return {
                            id: userID,
                            username,
                        }
                    }

                    return userInfo;
                });
            } else {
                return [
                    ...prev,
                    {
                        id: userID,
                        username,
                    }
                ]
            }
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
                    currentChat,
                    messages,
                    addMessage,
                    setUserOnline,
                    setCurrentChat: updateCurrentChat,
                    updateChatIDOnline,
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