import React, { FC, PropsWithChildren } from "react";
import ContainerFullHeight from "../../components/styles/ContainerFullHeght";

const EmptyLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <ContainerFullHeight fixed>
            { children }
        </ContainerFullHeight>
    )
}

export default EmptyLayout;