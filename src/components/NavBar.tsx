import { type JSX } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../utils/AuthContext';
import { logoutUser } from '../utils/api';
import { FaHome, FaSignOutAlt, FaUserCircle, FaPoo } from "react-icons/fa";
import { IoChatbubbleEllipses } from 'react-icons/io5';


function NavBar() {

    const navigate = useNavigate();
    const { token } = useAuthContext();
    type LinkType = {
        label: string;
        path: string;
        icon: JSX.Element;
    }
    const links: LinkType[] = [
        { label: 'Home', path: '/home', icon: <FaHome /> },
        { label: 'Profile', path: '/profile', icon: <FaUserCircle /> },
        { label: 'Conversations', path: '/conversations', icon: <IoChatbubbleEllipses /> },
    ]

    const handleLogout = (token: string | null) => {
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

    const handleNavigate = (path: string) => {
        navigate(path);
    }
    return (
        <div className='bg-zinc-900 h-screen w-36 px-5 flex flex-col align-items-center justify-between'>

            

        <div className="">
            <div className="mb-20 mt-2 h-32 grid place-items-center">
                <div className="text-[70px] text-orange-600 p-5  grid place-items-center">
                    <FaPoo />
                </div>
                <p className='text-2xl font-bold bg-orange-600 mt-2 text-zinc-50 rounded-3xl p-2'>PooTalk</p>
            </div>
            {links.map((link) => (
                <div key={link.path} className='rounded-full h-22 grid place-items-center my-5 py-2 px-3 hover:bg-zinc-800' onClick={() => handleNavigate(link.path)}>
                    <div className="text-[62px] text-white">
                        {link.icon}
                    </div>
                </div>
            ))}
        </div>
            
        <div className="justify-self-end rounded-full h-22 grid place-items-center my-5 py-2 px-3 hover:bg-zinc-800" 
                    onClick={() => handleLogout(token)}
                >
                <div className="text-[62px] text-white">
                    <FaSignOutAlt />
                </div>
        </div>


        </div>
    )
}

export default NavBar
