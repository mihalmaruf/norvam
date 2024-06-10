import React from 'react';
import { Navigate } from 'react-router-dom'
import useUserSession from '../context/user-session-hooks';

interface IProps {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {

    const userSessionHooks = useUserSession();
    const user = userSessionHooks.getUserSession();

    const allowed = user?.uid !== undefined && user?.uid !== '';

    return allowed ? <>{children}</> : <Navigate to="/signin" />;
}

export default PrivateRoute;