import React, { FC, PropsWithChildren } from "react";
import {
    MessageRow,
    MessageIcon,
    MessageTextBox,
    MessageText,
} from "./styles";
import { MessageProps } from "./interfaces";
import { AccountCircle } from "@mui/icons-material";

const Left: FC<MessageProps> = ({ messages }) => {
    return (
        <MessageRow $type="left">
            <MessageIcon>
                <AccountCircle />
            </MessageIcon>
            <MessageTextBox $type="left">
                { messages.map(message => (
                    <MessageText key={message.id} $type="left">
                        { message.text }                        
                    </MessageText>
                )) }
            </MessageTextBox>
        </MessageRow>
    )
}
const Right: FC<MessageProps> = ({ messages }) => {
    return (
        <MessageRow $type="right">
            <MessageTextBox $type="right">
                { messages.map(message => (
                    <MessageText key={message.id} $type="right">
                        { message.text }
                    </MessageText>
                )) }
            </MessageTextBox>
        </MessageRow>
    )
}

const Messages: FC<PropsWithChildren<{}>> & { Left: typeof Left, Right: typeof Right } = ({ children }) => {
    return (
        <div>
            { children }
        </div>
    )
}

Messages.Left = Left;
Messages.Right = Right;

export default Messages;