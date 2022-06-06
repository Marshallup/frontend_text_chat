import { MessageSide } from "../Messages/interfaces";

export type ChatMessageData = {
    id: string,
    text: string,
}
export type ChatMessage = {
    messageID: string,
    clientID: string,
    data: ChatMessageData[],
    type: MessageSide,
};

export interface ChatProps {
    isShowChat: boolean,
    isCurChatOnline: boolean,
    messages: ChatMessage[],
    onClickShareLink: () => void,
    addMessage: (message: string) => void,
}