import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/AuthProvider';

interface IProps {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {

    const userContext = useContext(UserContext);

    const allowed = userContext?.user?.uid !== undefined && userContext?.user?.uid !== '';

    return allowed ? <>{children}</> : <Navigate to="/signin" />;
}

export default PrivateRoute;