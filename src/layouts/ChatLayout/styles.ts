import styled from "styled-components";
import {
    Drawer,
    AppBar,
    Toolbar,
    IconButton,
} from "@mui/material";
import { OpenInterface } from "./interfaces";

const headerHeights = {
    desk: '48px',
}
const drawerWidths = {
    desk: {
        min: '60px',
        max: '170px',
    },
}

export const Header = styled(AppBar)<OpenInterface>`
    z-index: 1201 !important;
    transition: width 0.3s ease, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
    ${props => props.open ? `width: calc(100% - ${drawerWidths.desk.max}) !important;` : null}
`;
export const ToolbarChat = styled(Toolbar)<OpenInterface>`
    padding-left: 0 !important;
    ${props => props.open && `padding-left: 24px !important;`}
`;
export const IconBtnHeader = styled(IconButton)<OpenInterface>`
    padding: 12px !important;
    margin: 0 15px 0 10px !important;
    ${props => props.open && `display: none !important;`}
`;
export const IconBtnDrawerWrapper = styled.div`
    min-height: ${headerHeights.desk};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
`;
export const LayoutWrapper = styled.div`
    display: flex;
`;
export const ContentWrapper = styled.div`
    flex-grow: 1;
`;
export const Main = styled.main`
    height: 100vh;
    padding: 20px;
    flex-grow: 1;
`;
export const Spacer = styled.div`
    min-height: ${headerHeights.desk};
`;
export const DrawerChat = styled(Drawer)<OpenInterface>`
    width: ${drawerWidths.desk.min};
    transition: width 0.3s ease, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    ${props => props.open ? `width: ${drawerWidths.desk.max};` : null}
    & .MuiDrawer-paper {
        position: relative;
        overflow: hidden;
    }
`;
export const ChatLayoutContent = styled.div`
    height: calc(100% - ${headerHeights.desk});
`;
export const UserBreak = styled.span`
    display: inline-block;
    margin: 0 5px;
    
    &:before {
        content: '-';
        display: inline;
    }
`;