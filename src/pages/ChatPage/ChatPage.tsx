import React, { useMemo, FC, useContext } from "react";
import copy from 'copy-to-clipboard';
import Chat from "../../components/Chat";
import useChat from "../../hooks/useChat";
import { GeneralContext } from "../../contexts/GeneralContext";

const ChatPage: FC = () => {
    const { currentChat, messages, sendMyMessage } = useChat();
    const { showNotification } = useContext(GeneralContext);
    const chatMessages = useMemo(() => {
        const { username } = currentChat;

        if (username && messages[username]?.length) {
            return messages[username];
        }

        return [];
    }, [ currentChat, messages ]);

    function shareLink() {
        copy(window.location.origin);
        showNotification({
            autoHide: 800,
            type: 'success',
            message: 'Ссылка скопирована',
        });
    }

    return (
        <Chat
            isShowChat={!!currentChat.chatID}
            isCurChatOnline={currentChat.isUserOnline}
            messages={chatMessages}
            addMessage={sendMyMessage}
            onClickShareLink={shareLink}
        />
    )
}

export default ChatPage;