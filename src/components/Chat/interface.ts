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
    messages: ChatMessage[],
    addMessage: (message: string) => void,
}