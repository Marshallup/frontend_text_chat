import { createContext } from "react";
import { AuthContextInterface } from "./interfaces";

const AuthContext = createContext<AuthContextInterface>({
    isLogin: false,
    userInfo: {
        username: '',
        id: '',
    },
    setUserInfo: () => {},
    setUsername: () => {},
    setUserID: () => {},
    setIsLogin: () => {},
});

export default AuthContext;