import React from 'react'
import { useAuth } from '../AuthContext.jsx';
import { Navigate } from 'react-router-dom';


const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='bg-bgdarkb min-w-screen min-h-screen mt-16 lg:mt-0'>
      <div className='pt-8 text-white lg:pl-36'>
        <p>Profile</p>
      </div>
    </div>
  )
}

export default Profile