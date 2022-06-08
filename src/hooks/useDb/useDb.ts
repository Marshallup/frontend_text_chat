import { useCallback } from "react";
import { ChatContextMessages, ChatContextUser } from '../../contexts/ChatContext';
import { CurrentUserDB, MessagesDB, UsersDB } from "./interfaces";
import { useIndexedDBStore } from "use-indexeddb";
import { AuthContextUserInfo } from "../../contexts/AuthContext/interfaces";

let currentUserID: { current: number | null } = {
    current: null,
}

function useDb() {
    const { add, update: updateCurrentUser, getAll: getAllCurrentUser } = useIndexedDBStore<CurrentUserDB>('currentUser');
    const { update: updateMessages, getAll: getAllMessages } = useIndexedDBStore<MessagesDB>('messages');
    const { update: updateUsers, getAll: getAllUsers } = useIndexedDBStore<UsersDB>('users');

    const addMessages = useCallback(async (messages: ChatContextMessages) => {
        if (currentUserID.current) {
            await updateMessages({ id: currentUserID.current, messages });
        }
    }, [ updateMessages ]);
    const getCurrentUserByName = useCallback(async (username: string) => {
        const dbData = await getAllCurrentUser();

        return dbData.find(({ currentUser }) => username === currentUser?.username);
    }, [ getAllCurrentUser ]);
    const setCurrentUser = useCallback(async (user: AuthContextUserInfo) => {
        const currentUser = await getCurrentUserByName(user.username);

        if (currentUser?.id) {
            currentUserID.current = currentUser.id;

            await updateCurrentUser({ id: currentUser.id, currentUser: user });
        } else {
            currentUserID.current = await add({ currentUser: user});
        }

    }, [ add, updateCurrentUser, getCurrentUserByName ]);
    const setUsers = useCallback(async (users: ChatContextUser[]) => {
        if (currentUserID.current) {
            await updateUsers({ id: currentUserID.current, users });
        } else {
            setTimeout(() => {
                setUsers(users);
            }, 500);
        }
    }, [ updateUsers ]);
    const getUsersByID = useCallback(async (id: number) => {
        const dbData = await getAllUsers();

        return dbData.find(users => users.id === id);
    }, [ getAllUsers ]);
    const getMessagesByID = useCallback(async (id: number) => {
        const dbData = await getAllMessages();

        return dbData.find(message => message.id === id);
    }, [ getAllMessages ]);
    const getAllDataByCurrentUserID = useCallback(async (id: number) => {
        const users = await getUsersByID(id);
        const messages = await getMessagesByID(id);

        return {
            users,
            messages,
        }
    }, [ getUsersByID, getMessagesByID ]);


    return {
        addMessages,
        getCurrentUserByName,
        setCurrentUser,
        setUsers,
        getAllDataByCurrentUserID,
    }
}

export default useDb;