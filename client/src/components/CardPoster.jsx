import React from 'react'
import { Link } from 'react-router-dom';

const CardPoster = ({ id, title, year, img }) => {
    return (
        <div className='relative flex-shrink-0 w-52 mt-4 transition duration-300 cursor-pointer ease-in-out hover:scale-105 hover:text-redcol'>
            <Link to={`${id}`}>
                <img src={img} alt="" className='w-full h-full rounded  hover:rounded-none' />
            </Link>
            <ul className='absolute flex items-center top-2 font-thin right-4'>
                <li className=''>{year}</li>
            </ul>
            <div className='absolute bottom-2 left-4'>
                <span className='text-sm'>{title}</span>
            </div>
        </div>
    )
}

export default CardPoster