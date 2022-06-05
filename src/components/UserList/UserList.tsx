import React, { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { AuthContext } from "../../contexts/AuthContext";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Person } from "@mui/icons-material";
import { UserListEmpty } from './styles';

const UserList = () => {
    const { users, curChatID, setCurChatID } = useContext(ChatContext);
    const { userInfo } = useContext(AuthContext);

    function setChat(id: string) {
        if (curChatID !== id && userInfo.id !== id) {
            setCurChatID(id);
        }
    }

    return (
        <List component={'nav'}>
            {
                users.length ? users.map(user => (
                    <ListItemButton key={user.id} onClick={() => setChat(user.id)}>
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