import { createContext } from "react";
import { AuthContextInterface } from "./interfaces";

const AuthContext = createContext<AuthContextInterface>({
    isLogin: false,
    setIsLogin: () => {},
});

export default AuthContext;