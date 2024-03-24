import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '../components/Card.jsx';
import CardPoster from '../components/CardPoster.jsx';
import { useAuth } from '../AuthContext.jsx';
import  Search  from '../components/Search.jsx';
import  DisplaySlider from '../components/DisplaySlider.jsx';

const Home = () => {

    const { user, token } = useAuth();
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);

    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const trendingUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`;
    const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=1`;


    const fetchTrending = async () => {
        const res = await axios.get(trendingUrl);
        return res.data;
    }

    const fetchTopRated = async () => {
        const res = await axios.get(topRatedUrl);
        return res.data;
    }

    const searchMovies = async (query) => {
        const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`;
        const res = await axios.get(searchUrl);
        return res.data.results;
    };



    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTrending();
            setTrending(data.results);
        };

        const fetchDataTopRated = async () => {
            const topData = await fetchTopRated();
            console.log(topData.results);
            setTopRated(topData.results);
            setIsLoading(false);
        }

        fetchData();
        fetchDataTopRated()
    }, [])


    return (
        <div className='bg-bgdarkb min-w-full min-h-screen mt-18 pb-8 lg:mt-0'>
            <Search searchResults={searchResults} setSearchResults={setSearchResults} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className='pt-14 text-white lg:pl-32 lg:pt-10'>
                {isLoading ? (
                    <div className='flex items-center justify-center '>
                        Loading....
                    </div>
                ) : (
                    <>
                        {
                            searchResults.length === 0 ? (
                                <div className='flex flex-col gap-6'>
                                    {/* <div className='px-8'>
                                        <h1 className='text-xl font-light'>Trending</h1>
                                        <Slider
                                            dots={false}
                                            infinite={false}
                                            speed={200}
                                            slidesToShow={4}
                                            slidesToScroll={4}
                                            initialSlide={0}
                                        >
                                            {trending.length !== 0 ? (
                                                trending.map((trending, index) => {
                                                    return trending.title ? (
                                                        <Card
                                                            id={trending.id}
                                                            key={index}
                                                            title={trending.title}
                                                            year={trending.release_date.slice(0, 4)}
                                                            type={trending.media_type}
                                                            img={`https://image.tmdb.org/t/p/original/${trending.backdrop_path}`}
                                                        />
                                                    ) : (
                                                        ''
                                                    );
                                                })
                                            ) : (
                                                'No movies'
                                            )}
                                        </Slider>
                                    </div> */}
                                    <DisplaySlider title={'Trending'} array={trending} type={'Movies'}  />
                                    <div className='px-8'>
                                        <h1 className='text-xl font-light'>Recommended For You</h1>
                                        <div className=' card-container flex flex-wrap gap-4'>
                                            {
                                                topRated.length !== 0 ?
                                                    topRated.map((top, index) => {
                                                        return <CardPoster id={top.id} key={index} title={top.title} year={top.release_date.slice(0, 4)} img={`https://image.tmdb.org/t/p/original/${top.poster_path}`} />
                                                    }) : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                            ) :

                                <div className='flex flex-wrap gap-4'>
                                    {searchResults.length !== 0 ? (
                                        searchResults.filter((movie) => movie.backdrop_path)
                                            .map((result, index) => (
                                                <Card
                                                    id={result.id}
                                                    key={index}
                                                    title={result.title || result.name}
                                                    year={(result.release_date || result.first_air_date)?.slice(0, 4)}
                                                    type={result.media_type}
                                                    img={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
                                                />
                                            ))
                                    ) : (
                                        'No search results'
                                    )}
                                </div>
                        }
                    </>
                )}
            </div>
        </div>
    )
}

export default Home