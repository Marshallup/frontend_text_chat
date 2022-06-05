import styled from "styled-components";
import { MessageItemProps, MessageBoxProps } from "./interfaces";

export const MessageRow = styled.div<MessageItemProps>`
    margin-top: 10px;
    display: flex;
    justify-content: ${props => props.$type === 'left' ? 'flex-start' : 'flex-end'};
`;
export const MessageIcon = styled.div`
    margin-right: 10px;
    padding-top: 2px;
    svg {
        font-size: 35px;
        color: #bdbdbd;
    }
`;
export const MessageTextBox = styled.div<MessageBoxProps>`
    display: flex;
    flex-direction: column;
    align-items: ${props => props.$type === 'left' ? 'flex-start' : 'flex-end'};
`;
export const MessageText = styled.p<MessageItemProps>`
    margin: 0 0 4px 0;
    padding: 8px 12px;
    font-size: 15px;
    background-color: ${props => props.$type === 'left' ? '#ebebeb' : '#3f51b5'};
    color: ${props => props.$type === 'left' ? 'initial' : '#ffffff'};
    border-radius: 4px;

    &:last-child {
        margin-bottom: 0;
    }

    ${props => props.$type === 'left' ? `
        border-bottom-right-radius: 15px;
        border-top-right-radius: 15px;
        &:first-child {
            border-top-left-radius: 15px;
        }
        &:last-child {
            border-bottom-left-radius: 15px;
        }
    ` : `
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        &:first-child {
            border-top-right-radius: 15px;
        }
        &:last-child {
            border-bottom-right-radius: 15px;
        }
    `}
`;