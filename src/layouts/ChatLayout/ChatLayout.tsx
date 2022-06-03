import React, { FC, PropsWithChildren } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    Divider,
    List,
} from "@mui/material";
import { Menu } from '@mui/icons-material';
import { LayoutWrapper, Main } from "./styles";

const ChatLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <LayoutWrapper>
            <AppBar position="absolute" sx={{ zIndex: 1201 }}>
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography
                        variant="h6" 
                        color="inherit" 
                        component="div"
                    >
                        Chat
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                open={true}
                sx={
                    {
                        width: '200px',
                        '& .MuiDrawer-paper': {
                            position: 'relative',
                        }
                    }
                }
            >
                <div>
                    <IconButton>
                        icon
                    </IconButton>
                    <Divider />
                    <List>
                        <div>www</div>
                    </List>
                    <Divider />
                </div>
            </Drawer>

            <Main>
                { children }
            </Main>
        </LayoutWrapper>
    )
}

export default ChatLayout;