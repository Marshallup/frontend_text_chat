import React, { useMemo, useState, useCallback, FC, PropsWithChildren } from "react";
import uniqid from 'uniqid';
import { MessageSide } from "../../components/Messages";
import useDb from "../../hooks/useDb";
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
    const { addMessages, setUsers: setUsersDB } = useDb();
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
    const saveUserInDB = useCallback((users: ChatContextUser[]) => {
        setUsersDB(users.map(user => ({
            ...user,
            isOnline: false,
        })));
    }, [ setUsersDB ]);
    const setUserUnreadMessages = useCallback(
        (
            username: string,
            { count = 0, inc = false, dec = false }: UnreadMessagesOpt
        ) => {
            setUsers(prevState => {
                let needSaveDB = false;

                const userData = prevState.map(user => {
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

                        needSaveDB = true;
    
                        return {
                            ...user,
                            unreadMessages: countMessage
                        }
                    }
                    return user;
                });

                if (needSaveDB) {
                    saveUserInDB(userData);
                }

                return userData;
            });
        },
        [ saveUserInDB ],
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
    const setUserOnline = useCallback((chatID: ChatContextUser['id'], isUserOnline: ChatContextUser['isOnline'] = true) => {
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
                let messages = prevValue;

                if (chatID) {

                    if (prevValue[chatID]?.length) {
                        const lastIdxMessages = prevValue[chatID].length - 1;

                        if (prevValue[chatID][lastIdxMessages]?.clientID === id) {
                            messages = {
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
                        } else {
                            messages = {
                                ...prevValue,
                                [chatID]: [
                                    ...prevValue[chatID],
                                    { ...textMessageObject(id, text, type) },
                                ]
                            }
                        }

                    } else {
                        messages = {
                            ...prevValue,
                            [chatID]: [
                                { ...textMessageObject(id, text, type) },
                            ]
                        }
                    }
                }

                addMessages(messages);
                return messages;
            })
        },
        [ currentChat, setMessages, textMessageObject, addMessages, ],
    );
    const addUser = useCallback(
        (userID: string, username: string, checkUser: boolean = false) => {
            setUsers(prev => {
                let users = prev;

                if (prev.findIndex(user => user.id === userID) < 0) {
                    if (prev.findIndex(user => user.username === username) > -1) {
                        users = prev.map(user => {
                            if (user.username === username) {
                                return {
                                    ...user,
                                    isOnline: true,
                                    id: userID,
                                }
                            }
                            return user;
                        })
                    } else {
                        users = [
                            ...prev,
                            {
                                id: userID,
                                username,
                                unreadMessages: 0,
                                isOnline: true,
                                isChat: false,
                            }
                        ]
                    }
                } else if (checkUser && prev.length) {
                    users = prev.map(user => {
                        if (user.username === username) {
                            return {
                                ...user,
                                isOnline: true,
                                id: userID,
                            }
                        }
                        return {
                            ...user
                        }
                    })
                }

                saveUserInDB(users);

                return users;
            });
    
        }, [ setUsers, saveUserInDB ]
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
                    setUsers,
                    setMessages,
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