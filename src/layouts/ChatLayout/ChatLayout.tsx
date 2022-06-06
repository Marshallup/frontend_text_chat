import React, { useState, FC, PropsWithChildren, useContext } from "react";
import {
    Typography,
    Divider,
    IconButton,
    Grid,
} from "@mui/material";
import { Menu, ChevronLeft, AccountCircle } from '@mui/icons-material';
import {
    LayoutWrapper,
    Main,
    DrawerChat,
    Spacer,
    Header,
    ToolbarChat,
    IconBtnHeader,
    IconBtnDrawerWrapper,
    ChatLayoutContent,
} from "./styles";
import { ChatProvider } from "../../contexts/ChatContext";
import { AuthContext } from "../../contexts/AuthContext";
import UserList from "../../components/UserList";

const ChatLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
    const { userInfo } = useContext(AuthContext);
    const [ isOpen, setIsOpen ] = useState(false);

    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    return (
        <ChatProvider>
            <LayoutWrapper>
                <Header open={isOpen} position="absolute">
                    <ToolbarChat
                        variant="dense"
                        open={isOpen}
                    >
                        <IconBtnHeader
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            open={isOpen}
                            onClick={toggleOpen}
                        >
                            <Menu />
                        </IconBtnHeader>
                        <Typography
                            variant="h6" 
                            color="inherit" 
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            SimpleChat
                        </Typography>
                        <div>
                            <Grid display={'flex'}>
                                <AccountCircle sx={{ marginRight: '10px' }} />
                                { userInfo.username }
                            </Grid>
                        </div>
                    </ToolbarChat>
                </Header>

                <DrawerChat
                    variant="permanent"
                    open={isOpen}
                >
                    <div>
                        <IconBtnDrawerWrapper>
                            <IconButton onClick={toggleOpen}>
                                <ChevronLeft />
                            </IconButton>
                        </IconBtnDrawerWrapper>

                        <Divider />

                        <UserList />

                        <Divider />
                    </div>
                </DrawerChat>

                <Main>
                    <Spacer />
                    <ChatLayoutContent>
                        { children }
                    </ChatLayoutContent>
                </Main>
            </LayoutWrapper>
        </ChatProvider>
    )
}

export default ChatLayout;