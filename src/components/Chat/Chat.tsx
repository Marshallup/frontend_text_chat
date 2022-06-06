import React, { useRef, useEffect, FC } from "react";
import { ChatSection, ChatBody, ChatFooter, ShareLink } from "./styles";
import { ChatProps } from "./interface";
import InputPanel from "../InputPanel";
import Messages from "../Messages";
import { Typography } from "@mui/material";

const Chat: FC<ChatProps> = ({
    isShowChat,
    messages,
    isCurChatOnline,
    onClickShareLink,
    addMessage,
}) => {
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
            { isShowChat ? (
                <>
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
                        <InputPanel
                            disableSubmit={!isCurChatOnline}
                            onSubmit={onSendMessage}
                        />
                    </ChatFooter>
                </>
            ) : (
                <>
                    <Typography
                        variant="h6" 
                        color="inherit" 
                        component="div"
                        align="center"
                    >
                        Выберите собеседника из доступных, <br/>
                        либо <ShareLink onClick={onClickShareLink}>
                                пригласите
                            </ShareLink> нового
                    </Typography>
                </>
            )}
        </ChatSection>
    )
}

export default Chat;