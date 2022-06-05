import React, { useState, FC, PropsWithChildren } from "react";
import {
    Typography,
    Divider,
    IconButton,
} from "@mui/material";
import { Menu, ChevronLeft } from '@mui/icons-material';
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
import UserList from "../../components/UserList";

const ChatLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
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
                        >
                            Chat
                        </Typography>
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