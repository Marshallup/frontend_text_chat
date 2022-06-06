import React, { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { AuthContext } from "../../contexts/AuthContext";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Person } from "@mui/icons-material";
import { UserListEmpty } from './styles';

const UserList = () => {
    const { users, currentChat, setCurrentChat } = useContext(ChatContext);
    const { userInfo } = useContext(AuthContext);

    function setChat(id: string, username: string) {
        if (currentChat.username !== username && userInfo.username !== username) {
            setCurrentChat(id, username);
        }
    }

    return (
        <List component={'nav'}>
            {
                users.length ? users.map(user => (
                    <ListItemButton
                        key={user.id}
                        selected={user.username === currentChat.username}
                        onClick={() => setChat(user.id, user.username)}
                    >
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText>
                            { user.username }
                        </ListItemText>
                    </ListItemButton>
                )) : <ListItemButton>
                    <UserListEmpty>
                        Нет активных пользователей
                    </UserListEmpty>
                </ListItemButton>
            }
        </List>
    )
}

export default UserList;