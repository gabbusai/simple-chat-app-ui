import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../utils/AuthContext';
import { Toaster } from 'react-hot-toast';

function MainLayout() {
    const {token} = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);
    

  return (
    <div className='relative w-screen'>
      <Toaster />
      <Outlet />
    </div>
  )
}

export default MainLayout
