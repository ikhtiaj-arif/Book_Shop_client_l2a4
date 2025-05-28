
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { currentUser, useCurrentToken } from "../redux/features/auth/authSlice";


interface RouteProtectorProps {
    children: ReactNode;
    adminOnly?: boolean;
}

const RouteProtector = ({ children, adminOnly = false }: RouteProtectorProps) => {

    const token = useAppSelector(useCurrentToken)
    const user = useAppSelector(currentUser)

    if (!token) {
        return <Navigate to="/login" replace={true} />
    }
    if (adminOnly && user?.role !== "admin") {
        return <Navigate to="*" replace />;
    }

    return children;
};

export default RouteProtector;