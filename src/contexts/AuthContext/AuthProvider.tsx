import React, { useEffect, useState, useCallback, FC, PropsWithChildren } from "react";
import { faker } from "@faker-js/faker";
import AuthContext from "./AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContextUserInfo } from "./interfaces";

const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [ isLogin, setIsLogin ] = useState(!!process.env.REACT_APP_DEBUG_CHAT);
    const [ userInfo, setUserInfo ] = useState<AuthContextUserInfo>({
        username: process.env.REACT_APP_DEBUG_CHAT ? faker.name.middleName() : '',
        id: '',
    });
    const setUsername = useCallback((username: string) => {
        setUserInfo(prevState => ({
            ...prevState,
            username,
        }))
    }, []);
    const setUserID = useCallback((id: string) => {
        setUserInfo(prevState => ({
            ...prevState,
            id,
        }));
    }, []);

    useEffect(() => {
        if (location.pathname === '/' && isLogin) {
            navigate('/chat', { replace: true });
        }
    }, [ location, isLogin, navigate ]);

    return (
        <AuthContext.Provider value={{
            isLogin,
            userInfo,
            setIsLogin,
            setUserInfo,
            setUsername,
            setUserID,
        }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;