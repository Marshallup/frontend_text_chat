import React, { useState, FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/user/user";
import ChatSocket from "../../services/socket";
import { FormDataInterface } from "../../components/AuthForm/interfaces";
import AuthContext from "../../contexts/AuthContext";
import AuthForm from "../../components/AuthForm";

const Auth: FC = () => {
    const navigation = useNavigate();
    const { setIsLogin } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false);
    async function onSubmit(data: FormDataInterface) {
        setLoading(true);
        await login(data)
            .then(res => {
                console.log(res, 'res');
                console.log(ChatSocket, 'socket');

                setIsLogin(true);
                navigation('/chat');
            })
            .catch(error => {
                console.log(error, 'error server');
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <AuthForm
            loading={loading}
            onSubmit={onSubmit}
        />
    )
}

export default Auth;