import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import axios from 'axios';

const Search = ({ searchResults, setSearchResults, searchQuery, setSearchQuery }) => {
    const searchMovies = async (query) => {
        const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`;
        const res = await axios.get(searchUrl);
        return res.data.results;
    };
    return (
        <div className={`p-2 lg:px-14 pt-24 lg:pt-10 w-full flex items-center justify-center`}>
            <label htmlFor="" className='relative sm:w-5/6 w-full'>
                <button className='absolute translate-y-1/3 translate-x-3/4 sm:translate-x-1/4 text-white' >
                    <FiSearch className='top-0 text-2xl' /></button>
                <input type="text" className='block mx-auto pl-16 sm:px-12 py-2 w-full border-1 font-light border-none outline-none text-white bg-transparent'
                    placeholder="Search for movies or TV series"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={async (e) => {
                        if (e.key === 'Enter') {
                            const results = await searchMovies(searchQuery);
                            setSearchResults(results);
                        }
                    }}
                />
                <button className={`absolute top-0 right-8 translate-y-2/3 sm:translate-x-1/4 text-white ${searchQuery !== '' ? 'block' : 'hidden'}`} onClick={() => {
                    setSearchQuery('')
                    setSearchResults([])
                }}><AiOutlineCloseCircle className='text-xl' /></button>
            </label>
            <button className='border-1 rounded text-white px-4 py-1 bg-redcol hover:text-redcol hover:bg-white transition-all duration-300 ease-in-out'
                onClick={async () => {
                    const results = await searchMovies(searchQuery);
                    setSearchResults(results);
                }}>Search</button>
        </div>
    )
}


export default Search