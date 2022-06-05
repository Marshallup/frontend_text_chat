export type MessageSide = 'left' | 'right';
export interface MessageBoxProps {
    $type: MessageSide,
}
export interface MessageProps {
    messages: {
        id: string,
        text: string
    }[],
}
export interface MessageItemProps {
    $type: MessageSide,
}