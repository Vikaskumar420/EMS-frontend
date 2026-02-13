import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const RoleBaseRoutes = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to='/login' replace />;
    }

    if (!requiredRole.includes(user.role)) {
        return user.role === "admin"
            ? <Navigate to="/admin-dashboard" replace />
            : <Navigate to="/employee-dashboard" replace />;
    }

    return children;
}

export default RoleBaseRoutes;