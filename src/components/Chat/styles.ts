import styled from "styled-components";

export const ChatSection = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
export const ChatBody = styled.div`
    flex: 1;
    background-color: #fafafa;
    padding: 10px;
    margin-bottom: 20px;
    height: 100%;
    overflow: auto;
    min-height: 100px;
`;
export const ShareLink = styled.span`
    cursor: pointer;
    color: #1976d2;
    text-decoration: underline;
    user-select: none;
`;
export const ChatFooter = styled.div``;