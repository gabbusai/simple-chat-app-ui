import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../utils/AuthContext';
import { logoutUser } from '../utils/api';

function NavBar() {

    const navigate = useNavigate();
    const { token } = useAuthContext();
    const links = [
        { label: 'Home', path: '/home' },
    ]

    const handleLogout = (token: string) => {
        logoutUser(token)
            .then(() => {
                // Handle successful logout (e.g., redirect to login page)
                navigate('/login');
            })
            .catch((error) => {
                // Handle error (e.g., show error message)
                console.error("Logout error:", error);
            });
    }
    return (
        <div className=''>
        
        </div>
    )
}

export default NavBar
