import React, { FC } from "react";
import Chat from "../../components/Chat";
import useChat from "../../hooks/useChat";

const ChatPage: FC = () => {
    const { messages, sendMyMessage } = useChat();

    return (
        <Chat
            messages={messages}
            addMessage={sendMyMessage}
        />
    )
}

export default ChatPage;