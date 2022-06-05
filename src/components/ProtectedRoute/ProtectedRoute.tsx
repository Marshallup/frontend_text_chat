import React, { useContext, FC } from "react";
import { ProtectedRouteProps } from "./interfaces";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const ProtectedRoute: FC<ProtectedRouteProps> = ({ redirectUrl }) => {
    const { isLogin } = useContext(AuthContext);

    if (!isLogin) {
        return <Navigate to={redirectUrl || '/'} />
    }

    return <Outlet />

}

export default ProtectedRoute;