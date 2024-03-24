import React from 'react'
import {MdLocalMovies} from 'react-icons/md'
import {PiTelevisionBold} from 'react-icons/pi'
import { Link, useLocation } from 'react-router-dom';

const Card = ({id,img,title,year,type})=>{
    const location = useLocation();
    

    return(
        <div className='relative flex-shrink-0 max-w-[480px]:w-52 max-w-xs sm:max-w-sm mt-4 mx-2 transition duration-300 cursor-pointer ease-in-out hover:scale-105 hover:text-redcol'>
            <Link to={ type === 'movies' || location.pathname === '/movies' ? `/movies/${id}` : type === 'tv' && location.pathname === '/' ? `/tv/${id}` : `${id}`}>
            <img src={img} alt="" className='w-full h-full rounded  hover:rounded-none' />
            </Link>
            <ul  className='absolute flex items-center bottom-12 font-thin left-4'>
                <li className=''>{year}</li>
                <li className='mx-2 flex items-center gap-1'>{type=== 'movie' ? <MdLocalMovies className='inline' /> : type === 'tv' ? <PiTelevisionBold/> : ''}</li> 
            </ul>
            <div className='absolute bottom-4 left-4'>
                <span className='text-lg'>{title.slice(0,32)}</span>
            </div>
        </div>
    )
}

export default Card