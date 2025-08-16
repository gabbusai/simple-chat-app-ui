import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../utils/AuthContext';
import { Toaster } from 'react-hot-toast';
import NavBar from './NavBar';

function MainLayout() {
    const {token} = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);
    

  return (
    <div className='relative w-screen flex'>
      <div className="sticky top-0">
          <Toaster />
          <NavBar />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
