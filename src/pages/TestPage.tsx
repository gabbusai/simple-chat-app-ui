import React from 'react'
import { useAuthContext } from '../utils/AuthContext';

export default function TestPage() {

  const {token} = useAuthContext();
  const handleGetUser = (token:string | null) => {
    // Logic to get user information
  }

  return (
    <div className='bg-green-500'>
        <h1 className='text-white'>Test Page</h1>
        <button onClick={() => handleGetUser(token)}>GET USER</button>
    </div>
  )
}
