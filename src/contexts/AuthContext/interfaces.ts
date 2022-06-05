export type AuthContextUserInfo = {
    username: string,
    id: string,
}
export interface AuthContextInterface {
    isLogin: boolean,
    userInfo: {
        username: string,
        id: string,
    },
    setUserInfo: (userInfo: AuthContextUserInfo) => void,
    setIsLogin: (status: boolean) => void,
    setUsername: (username: string) => void,
    setUserID: (id: string) => void,
}