import React, { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Badge, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Person } from "@mui/icons-material";
import { UserListEmpty } from './styles';

const UserList = () => {
    const { users, currentChat, setUserUnreadMessages, setCurrentChat } = useContext(ChatContext);
    const { userInfo } = useContext(AuthContext);

    function setChat(id: string, username: string) {
        if (currentChat?.username !== username && userInfo.username !== username) {
            setCurrentChat(id, username);
            setUserUnreadMessages(username, { count: 0 });
        }
    }

    return (
        <List component={'nav'}>
            {
                users.length ? users.map(user => (
                    <ListItemButton
                        key={user.id}
                        selected={user.username === currentChat?.username}
                        onClick={() => setChat(user.id, user.username)}
                    >
                        <ListItemIcon>
                            <Badge
                                color={user.isOnline ? 'success' : 'warning'}
                                variant={'dot'}
                                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                            >
                                <Badge color={'secondary'} badgeContent={user.unreadMessages}>
                                    <Person />
                                </Badge>
                            </Badge>
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