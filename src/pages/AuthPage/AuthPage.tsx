import React, { useState, FC, useContext, useCallback } from "react";
import { login } from "../../services/user/user";
import { FormDataInterface, ServerError } from "../../components/AuthForm";
import { AuthContext } from "../../contexts/AuthContext";
import AuthForm from "../../components/AuthForm";

const AuthPage: FC = () => {
    const { setIsLogin, setUsername } = useContext(AuthContext);
    const [ serverError, setServerError ] = useState<ServerError | null>(null);
    const [ loading, setLoading ] = useState(false);
    async function onSubmit(data: FormDataInterface) {
        setLoading(true);
        await login(data)
            .then(() => {
                setUsername(data.username);
                setIsLogin(true);
            })
            .catch(error => {
                setServerError(error.errors[0]);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    const clearCustomErrors = useCallback(() => {
        setServerError(prev => {
            if (prev?.message) {
                return null
            }
            return prev;
        });
    }, []);

    return (
        <AuthForm
            loading={loading}
            customError={serverError}
            clearCustomError={clearCustomErrors}
            onSubmit={onSubmit}
        />
    )
}

export default AuthPage;