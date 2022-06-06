import { useCallback, useContext, useEffect } from 'react';
import ChatSocket, { EVENTS } from "../../services/ChatSocket";
import { AuthContext } from '../../contexts/AuthContext';
import { ChatContext } from '../../contexts/ChatContext';
import { GeneralContext } from '../../contexts/GeneralContext';

function useChat() {
    const { showNotification } = useContext(GeneralContext);
    const { userInfo, setUserInfo } = useContext(AuthContext);
    const {
        users,
        currentChat,
        messages,
        addUser,
        removeUser,
        updateChatIDOnline,
        addMessage,
        setUserOnline,
    } = useContext(ChatContext);

    const sendMyMessage = useCallback((message: string) => {
        const socket = ChatSocket.socket;

        if (socket) {
            addMessage(message, userInfo.username, 'right');
            socket.emit(EVENTS.SEND_MESSAGE, { id: currentChat.chatID, username: userInfo.username, message });
        }
    }, [ addMessage, currentChat, userInfo.username ]);

    const addClientMessage = useCallback((id: string, message: string, getID?: string) => {
        addMessage(message, id, 'left', getID);
    }, [ addMessage ]);

    useEffect(() => {
        if (currentChat.chatID) {
            const currentChatUser = users.find(user => user.username === currentChat.username);

            if (currentChat.isUserOnline) {
                if (!currentChatUser) {
                    setUserOnline(false);
                    showNotification({
                        autoHide: 3000,
                        message: `Пользователь ${currentChat.username} - отключился`,
                        type: 'info',
                    });
                }
            } else {
                if (currentChatUser) {
                    updateChatIDOnline(currentChatUser.id);
                    showNotification({
                        autoHide: 3000,
                        message: `Пользователь ${currentChat.username} - онлайн`,
                        type: 'info',
                    });
                }
            }
        }
    }, [ users, currentChat, setUserOnline, updateChatIDOnline, showNotification ]);

    useEffect(() => {
        const socket = ChatSocket.socket;

        if (socket && !socket.hasListeners(EVENTS.GET_MESSAGE)) {
            socket.on(EVENTS.GET_MESSAGE, ({ username, message }) => {
                addClientMessage(username, message, username);
            });
        }
    }, [ addClientMessage ]);
    useEffect(() => {
        const socket = ChatSocket.socket;

        if (socket && currentChat.chatID) {
            socket.emit(EVENTS.CONNECT_USER, { id: currentChat.chatID });
        }

        return () => {
            socket?.off(EVENTS.CONNECT_USER);
        }
    }, [ currentChat.chatID ]);

    useEffect(() => {
        ChatSocket.initConnection();

        const socket = ChatSocket.socket;

        if (socket) {
            !socket.hasListeners('connect') && socket.once('connect', () => {
                socket.emit(EVENTS.ADD_NICKNAME, { username: userInfo.username });
                setUserInfo({
                    username: userInfo.username,
                    id: socket.id,
                });
            });
            !socket.hasListeners(EVENTS.ADD_USER) && socket.on(EVENTS.ADD_USER, ({ id, username }: { id: string, username: string }) => {
                addUser(id, username);
                showNotification({
                    autoHide: 3000,
                    message: `Пользователь ${username} - подключился`,
                    type: 'info',
                });
            });
            !socket.hasListeners(EVENTS.ADD_USER_INITIAL) && socket.on(EVENTS.ADD_USER_INITIAL, ({ id, username }: { id: string, username: string }) => {
                addUser(id, username);
            });
            !socket.hasListeners(EVENTS.USER_LEAVE) && socket.on(EVENTS.USER_LEAVE, ({ id }: { id: string }) => {
                removeUser(id);
            });
        }

        return () => {
            ChatSocket.socket?.off(EVENTS.ADD_USER);
            ChatSocket.socket?.off(EVENTS.USER_LEAVE);
        };
    }, [ userInfo.username, addUser, removeUser, setUserInfo, showNotification ]);

    return {
        currentChat,
        messages,
        addMessage,
        sendMyMessage,
    }
}

export default useChat;