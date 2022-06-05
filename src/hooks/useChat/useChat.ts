import { useCallback, useContext, useEffect, useState } from 'react';
import uniqid from 'uniqid';
import ChatSocket, { EVENTS } from "../../services/ChatSocket";
import { AuthContext } from '../../contexts/AuthContext';
import { ChatContext } from '../../contexts/ChatContext';
import { ChatMessage } from "../../components/Chat/interface";
import { MessageSide } from '../../components/Messages/interfaces';

function useChat() {
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const { curChatID, addUser, removeUser } = useContext(ChatContext);
    const [ messages, setMessages ] = useState<ChatMessage[]>([]);

    const addMessage = useCallback((text: string, id: string, type: MessageSide) => {
        setMessages(prevMessages => {
            const lastIdxMessages = prevMessages.length - 1;

            console.log(prevMessages[lastIdxMessages]?.clientID, id, 'prevMessages')

            if (prevMessages[lastIdxMessages]?.clientID === id) {
                return prevMessages.map((prevMessage, idx) => {
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
                });
            }

            return [
                ...prevMessages,
                {
                    messageID: uniqid(),
                    clientID: id,
                    data: [
                        {
                            id: uniqid(),
                            text,
                        }
                    ],
                    type,
                }
            ];
        });
    }, [])

    function sendMyMessage(message: string) {
        const socket = ChatSocket.socket;

        if (socket) {
            addMessage(message, socket.id, 'right');
            socket.emit(EVENTS.SEND_MESSAGE, { id: curChatID, message });
        }
    }

    const addClientMessage = useCallback((id: string, message: string) => {
        addMessage(message, id, 'left');
    }, [ addMessage ]);

    useEffect(() => {
        const socket = ChatSocket.socket;

        if (socket && !socket.hasListeners(EVENTS.GET_MESSAGE)) {
            socket.on(EVENTS.GET_MESSAGE, ({ id, message }) => {
                addClientMessage(id, message);
                console.log(id, message, 'message get');
            });
        }
    }, [ addClientMessage ]);
    useEffect(() => {
        const socket = ChatSocket.socket;

        if (socket && curChatID) {
            socket.emit(EVENTS.CONNECT_USER, { id: curChatID });
        }

        return () => {
            socket?.off(EVENTS.CONNECT_USER);
        }
    }, [ curChatID ]);

    useEffect(() => {
        ChatSocket.initConnection();

        const socket = ChatSocket.socket;

        if (socket) {
            socket.once('connect', () => {
                socket.emit(EVENTS.ADD_NICKNAME, { username: userInfo.username });
                addUser(socket.id, userInfo.username);
                setUserInfo({
                    username: userInfo.username,
                    id: socket.id,
                });
            });
            socket.on(EVENTS.ADD_USER, ({ id, username }: { id: string, username: string }) => {
                console.log(id, username, 'data');
                addUser(id, username);
            })
            socket.on(EVENTS.USER_LEAVE, ({ id }: { id: string }) => {
                removeUser(id);
            });
        }

        return () => {
            ChatSocket.socket?.off(EVENTS.ADD_USER);
            ChatSocket.socket?.off(EVENTS.USER_LEAVE);
        };
    }, [ userInfo.username, addUser, removeUser, setUserInfo ]);

    return {
        messages,
        addMessage,
        sendMyMessage,
    }
}

export default useChat;