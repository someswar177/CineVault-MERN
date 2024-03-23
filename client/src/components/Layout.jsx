import React, { useState, useEffect } from 'react'
import { FcClapperboard } from 'react-icons/fc'
import { BsFillGridFill } from 'react-icons/bs'
import { MdLocalMovies } from 'react-icons/md'
import { BsBookmarkFill } from 'react-icons/bs'
import { PiTelevisionBold } from 'react-icons/pi'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx'


const Layout = () => {

    const { token,user, logout } = useAuth();
    console.log(user);
    const location = useLocation();
    const [rerenderKey, setRerenderKey] = useState(true);
    const navigate = useNavigate();


    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <nav className='fixed z-50 left-0 top-0 w-full shadow-xl flex justify-between items-center p-4 lg:py-8 bg-bgblue lg:left-3 lg:top-3 lg:justify-between lg:items-center lg:flex-col lg:w-auto lg:min-h-[95%] lg:rounded-xl lg:shadow-2xl lg:px-6'>
                <div>
                    <Link to="/">
                        <FcClapperboard className='clap text-4xl' />
                    </Link>
                </div>
                <div className='flex items-center lg:flex-col lg:justify-center'>
                    <Link to="/" className={`mr-2 sm:mr-4 md:mr-8 lg:my-3 lg:mr-0 border-2 rounded-md  p-1 ${location.pathname === '/' ? 'text-white border-white' : 'text-slate-400 border-slate-600'} `}> <BsFillGridFill className='text-2xl ' /> </Link>
                    <Link to="/tv" className={`mr-2 sm:mr-4 md:mr-8 lg:my-3 lg:mr-0 border-2 rounded-md  p-1 ${location.pathname === '/tv' ? 'text-white border-white' : 'text-slate-400 border-slate-600'} `}> <PiTelevisionBold className='text-2xl' /> </Link>
                    <Link to="/movies" className={`mr-2 sm:mr-4 md:mr-8 lg:my-3 lg:mr-0 border-2 rounded-md p-1 ${location.pathname === '/movies' ? 'text-white border-white' : 'text-slate-400 border-slate-600'} `}> <MdLocalMovies className='text-2xl' /> </Link>
                    <Link to="/bookmarks" className={`mr-2 sm:mr-4 md:mr-8 lg:my-3 lg:mr-0 border-2 rounded-md  p-1 ${location.pathname === '/bookmarks' ? 'text-white border-white' : 'text-slate-400 border-slate-600'} `}> <BsBookmarkFill className='text-2xl' /> </Link>
                </div>
                <div className='flex gap-1 lg:flex-col items-center justify-center lg:gap-8' >
                    {token ? (
                        <button
                            className="p-1 border-slate-600 rounded-md border-2"
                            onClick={handleLogout}
                        >
                            <BiLogOut className="max-w-[394px]:text-xl text-2xl text-slate-400" />
                        </button>
                    ) : (
                        <a
                            className="p-1 px-2 text-white bg-redcol rounded-md cursor-pointer"
                            onClick={() => {
                                navigate('/login');
                            }}
                        >
                            Login
                        </a>
                    )}
                    
                </div>
            </nav >
            <Outlet />
        </>
    )
}

export default Layout