import React, { useState, FC, useContext, useCallback } from "react";
import { login } from "../../services/user/user";
import { FormDataInterface, ServerError } from "../../components/AuthForm";
import { AuthContext } from "../../contexts/AuthContext";
import AuthForm from "../../components/AuthForm";
import useDb from "../../hooks/useDb";
import { ChatContext } from "../../contexts/ChatContext";

const AuthPage: FC = () => {
    const { getCurrentUserByName, getAllDataByCurrentUserID } = useDb();
    const { setIsLogin, setUsername } = useContext(AuthContext);
    const { setUsers, setMessages } = useContext(ChatContext);
    const [ serverError, setServerError ] = useState<ServerError | null>(null);
    const [ loading, setLoading ] = useState(false);
    async function onSubmit(data: FormDataInterface) {
        const username = data.username.trim();

        setLoading(true);

        const currentUser = await getCurrentUserByName(username);

        let allData;

        if (currentUser?.id) {
            allData = await getAllDataByCurrentUserID(currentUser.id);
        }

        const success = await login(data)
            .then(async () => {
                setUsername(username);
                return true;
            })
            .catch(error => {
                setServerError(error.errors[0]);
                return false;
            })
            .finally(() => {
                setLoading(false);
            });

        if (success) {

            if (allData?.users) {
                setUsers(allData.users.users);
            }

            if (allData?.messages?.messages) {
                setMessages(allData.messages.messages);
            }

            setIsLogin(true);
        }
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