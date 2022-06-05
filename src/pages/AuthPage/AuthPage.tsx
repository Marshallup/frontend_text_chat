import React, { useState, FC, useContext } from "react";
import { login } from "../../services/user/user";
import { FormDataInterface } from "../../components/AuthForm/interfaces";
import { AuthContext } from "../../contexts/AuthContext";
import AuthForm from "../../components/AuthForm";

const AuthPage: FC = () => {
    const { setIsLogin, setUsername } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false);
    async function onSubmit(data: FormDataInterface) {
        setLoading(true);
        await login(data)
            .then(() => {
                setUsername(data.username);
                setIsLogin(true);
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

export default AuthPage;