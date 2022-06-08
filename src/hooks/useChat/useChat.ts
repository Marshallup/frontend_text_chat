import { useCallback, useContext, useEffect } from 'react';
import ChatSocket, { EVENTS } from "../../services/ChatSocket";
import { AuthContext } from '../../contexts/AuthContext';
import { ChatContext } from '../../contexts/ChatContext';
import { GeneralContext } from '../../contexts/GeneralContext';
import { useIndexedDBStore } from "use-indexeddb";
import useDb from '../useDb';

function useChat() {
    const { setCurrentUser } = useDb();
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const {
        currentChat,
        messages,
        addUser,
        getUserByUsername,
        setUserUnreadMessages,
        setUserOnline,
        addMessage,
    } = useContext(ChatContext);
    const dbMethods = useIndexedDBStore('messagesHistory');
    const { showNotification } = useContext(GeneralContext);
    const sendMyMessage = useCallback((message: string) => {
        const socket = ChatSocket.socket;

        if (socket) {
            addMessage(message, userInfo.username, 'right');
            socket.emit(EVENTS.SEND_MESSAGE, { id: currentChat?.id, username: userInfo.username, message });
        }
    }, [ addMessage, currentChat, userInfo.username ]);

    const addClientMessage = useCallback((id: string, message: string, getID?: string) => {
        addMessage(message, id, 'left', getID);
    }, [ addMessage ]);
    const showNotificationUser = useCallback((username: string, type: 'on' | 'off') => {
        const currentUser = getUserByUsername(username);
        let message = `Пользователь ${username}${currentUser?.isChat ? ' (собеседник)' : ''} `;

        switch(type) {
            case 'on':
                message += 'подключился'
                break;
            default:
                message += 'отключился';
                break;
        }

        showNotification({
            autoHide: 2000,
            type: 'info',
            message,
        });
    }, [ showNotification, getUserByUsername ]);

    useEffect(() => {
        const socket = ChatSocket.socket;

        if (socket && !socket.hasListeners(EVENTS.GET_MESSAGE)) {
            socket.on(EVENTS.GET_MESSAGE, ({ username, message }) => {
                addClientMessage(username, message, username);
                setUserUnreadMessages(username, { inc: true });
            });
        }

        return () => {
            socket?.off(EVENTS.GET_MESSAGE);
        }
    }, [ addClientMessage, setUserUnreadMessages ]);
    useEffect(() => {
        const socket = ChatSocket.socket;

        if (socket && currentChat?.id) {
            socket.emit(EVENTS.CONNECT_USER, { id: currentChat?.id });
        }

        return () => {
            socket?.off(EVENTS.CONNECT_USER);
        }
    }, [ currentChat ]);

    useEffect(() => {
        const socket = ChatSocket.socket;

        if (socket) {
            socket.on(EVENTS.ADD_USER, ({ id, username }: { id: string, username: string }) => {
                showNotificationUser(username, 'on');
                addUser(id, username);
            });
            socket.on(EVENTS.ADD_USER_INITIAL, ({ id, username }: { id: string, username: string }) => {
                addUser(id, username, true);
            });
            socket.on(EVENTS.USER_LEAVE, ({ id, username }: { id: string, username: string }) => {
                showNotificationUser(username, 'off');
                setUserOnline(id, false);
            });
        }

        return () => {
            ChatSocket.socket?.off(EVENTS.ADD_USER_INITIAL);
            ChatSocket.socket?.off(EVENTS.ADD_USER);
            ChatSocket.socket?.off(EVENTS.USER_LEAVE);
        };

    }, [ dbMethods, addUser, setUserOnline, showNotificationUser ]);

    useEffect(() => {
        const socket = ChatSocket.socket;

        if (socket) {
            socket.once('connect', () => {
                const userInfoSaved = {
                    username: userInfo.username,
                    id: socket.id,
                }
                socket.emit(EVENTS.ADD_NICKNAME, { username: userInfo.username });
                setUserInfo(userInfoSaved);
                setCurrentUser(userInfoSaved);
            });
        }

        ChatSocket.initConnection();

        return () => {
            ChatSocket.socket?.off('connect');
        };
    }, [ userInfo.username, setUserInfo, setCurrentUser ]);

    return {
        currentChat,
        messages,
        addMessage,
        sendMyMessage,
    }
}

export default useChat;