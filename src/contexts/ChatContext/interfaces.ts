export type ChatContextUser = {
    id: string,
    username: string,
};
export type CurChatIDType = string | null;

export interface ChatContextInterface {
    curChatID: CurChatIDType,
    users: ChatContextUser[],
    setUsers: (users: ChatContextUser[]) => void,
    addUser: (userID: ChatContextUser['id'], username: ChatContextUser['username']) => void,
    setCurChatID: (curChatID: CurChatIDType) => void,
    removeUser: (userID: string) => void,
}