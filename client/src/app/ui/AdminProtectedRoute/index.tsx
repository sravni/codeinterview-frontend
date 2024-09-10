
import React, { useEffect } from 'react';
import { useUser } from '../../../entities/user';
import { Navigate } from 'react-router-dom';

export type AdminProtectedRouteProps = {
    children: React.ReactNode;
}
export const AdminProtectedRoute = (props: AdminProtectedRouteProps) => {
    const { children } = props;
    const [user] = useUser();
    
    useEffect(() => { 
        if (!user) {
            window.location.href = "/auth/login";
        }
    }, [user]);
    
    if (!user) return null;
    
    if (user && !user.isAdmin) {
        return <Navigate to="/forbidden"/>
    }

    return <>{children}</>;
};