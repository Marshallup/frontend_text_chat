import styled from "styled-components";
import { Button } from '@mui/material';
import { ButtonElProps } from "./interface";

export const ButtonEl = styled(Button)<ButtonElProps>`
    ${props => props.$loading && 'color: transparent !important;'}
`;
export const CircElWrap = styled.div<ButtonElProps>`
    position: absolute;
    display: flex;
    left: 50%;
    transform: translateX(-50%);
    visibility: ${props => props.$loading ? 'visible' : 'hidden'}
`;