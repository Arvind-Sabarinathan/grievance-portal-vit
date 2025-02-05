import React from 'react';
import { Button } from 'antd';
import { useAuth } from "../contexts/AuthContext.jsx";


const AdminDashboard = () => {
    const { signout } = useAuth();
        
            const handleSignout = async () => {
                await signout();
    }
    
    return (
        <>
            <p>Admin Dashboard</p>
            <Button size='large' type='primary' className='profile-btn' onClick={handleSignout}>
                                Sign out
            </Button>
        </>
    );
};

export default AdminDashboard;
