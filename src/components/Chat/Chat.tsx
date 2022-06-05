import React, { useRef, useEffect, FC } from "react";
import { ChatSection, ChatBody, ChatFooter } from "./styles";
import { ChatProps } from "./interface";
import InputPanel from "../InputPanel";
import Messages from "../Messages";

const Chat: FC<ChatProps> = ({ messages, addMessage }) => {
    const chatBodyRef = useRef<HTMLDivElement>(null);

    function onSendMessage(message: string) {
        addMessage(message.trim());
    }
    useEffect(() => {
        const chatBodyEl = chatBodyRef.current;

        if (chatBodyEl) {
            chatBodyRef.current.scrollTo({ top: chatBodyEl.scrollHeight });
        }
    }, [ messages ]);

    return (
        <ChatSection>
            <ChatBody ref={chatBodyRef}>
                <Messages>
                    { messages.map(messageInfo => {
                        switch(messageInfo.type) {
                            case 'left':
                                return <Messages.Left
                                    key={messageInfo.messageID}
                                    messages={messageInfo.data}
                                />
                            default:
                                return <Messages.Right
                                    key={messageInfo.messageID}
                                    messages={messageInfo.data}
                                />
                        }
                    }) }
                </Messages>
            </ChatBody>
            <ChatFooter>
                <InputPanel onSubmit={onSendMessage} />
            </ChatFooter>
        </ChatSection>
    )
}

export default Chat;