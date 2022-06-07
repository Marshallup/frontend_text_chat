import React, { useMemo, useState, useCallback, FC, PropsWithChildren } from "react";
import uniqid from 'uniqid';
import { MessageSide } from "../../components/Messages/interfaces";
import ChatContext from "./ChatContext";
import {
    AddMessageType,
    ChatContextMessages,
    ChatContextUser,
    GetChatID,
    UnreadMessagesOpt,
} from "./interfaces";

const ChatProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [ users, setUsers ] = useState<ChatContextUser[]>([]);
    const currentChat = useMemo(() => {
        return users.find(user => user.isChat);
    }, [ users ]);
    const [ messages, setMessages ] = useState<ChatContextMessages>({});
    const getUserByID = useCallback((id: string) => {
        return users.find(user => user.id === id);
    }, [ users ]);
    const getUserByUsername = useCallback((username: string) => {
        return users.find(user => user.username === username);
    }, [ users ]);
    const setUserUnreadMessages = useCallback(
        (
            username: string,
            { count = 0, inc = false, dec = false }: UnreadMessagesOpt
        ) => {
            setUsers(prevState => prevState.map(user => {
                if (user.username === username) {
                    let countMessage: number;

                    if (user.isChat && user.unreadMessages === 0) {
                        return user;
                    }

                    if (inc) {
                        countMessage = user.unreadMessages + 1;
                    } else if (dec && user.unreadMessages > 0) {
                        countMessage = user.unreadMessages -= 1;
                    } else if (count >= 0) {
                        countMessage = count;
                    } else {
                        countMessage = user.unreadMessages;
                    }

                    return {
                        ...user,
                        unreadMessages: countMessage
                    }
                }
                return user;
            }));
        },
        [],
    );
    const setCurrentChat = useCallback((id: string) => {
        setUsers(prevState => prevState.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    isChat: true,
                }
            }
            return {
                ...user,
                isChat: false,
            }
        }))
    }, []);
    const setChatOnline = useCallback((chatID: ChatContextUser['id'], isUserOnline: ChatContextUser['isOnline'] = true) => {
        setUsers(prevState => prevState.map(user => {
            if (user.id === chatID) {
                return {
                    ...user,
                    isOnline: isUserOnline,
                }
            }
            return user;
        }));
    }, []);
    const setUserOnline = useCallback((id: string, isUserOnline: boolean) => {
        setUsers(prevState => prevState.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    isOnline: false,
                }
            }

            return user;
        }));
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
                const chatID = getChatID || currentChat?.username;

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
        [ currentChat, setMessages, textMessageObject, ],
    );
    const addUser = useCallback(
        (userID: string, username: string, unreadMessages: number = 0, isOnline: boolean = true, isChat: boolean = false) => {
            setUsers(prev => {
                if (prev.findIndex(user => user.id === userID) < 0) {

                    if (prev.findIndex(user => user.username === username) > -1) {
                        return prev.map(user => {
                            if (user.username === username) {
                                return {
                                    ...user,
                                    isOnline: true,
                                    id: userID,
                                }
                            }
                            return user;
                        })
                    }
    
                    return [
                        ...prev,
                        {
                            id: userID,
                            username,
                            unreadMessages,
                            isOnline,
                            isChat,
                        }
                    ]
                }

                return prev;
            });
    
        }, [ setUsers ]
    );
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
                    getUserByID,
                    getUserByUsername,
                    setUserUnreadMessages,
                    setCurrentChat,
                    setChatOnline,
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