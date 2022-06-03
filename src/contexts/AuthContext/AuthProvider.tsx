import React, { useState, FC, PropsWithChildren } from "react";
import AuthContext from "./AuthContext";

const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;