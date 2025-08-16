
import { useAuthContext } from '../utils/AuthContext';
import { getUser } from '../utils/api';

export default function TestPage() {

  const {token} = useAuthContext();
  const handleGetUser = (token:string | null) => {
    // Logic to get user information
    getUser(token);
  }

  return (
    <div className='bg-green-500'>
        <h1 className='text-white'>Test Page</h1>
        <button onClick={() => handleGetUser(token)}>GET USER</button>
    </div>
  )
}
