import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card.jsx';
import CardPoster from '../components/CardPoster.jsx';
import Search from '../components/Search.jsx';
import DisplaySlider from '../components/DisplaySlider.jsx';



const Tv = () => {
  const [tv, setTv] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  const tvUrl = `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const topRatedTv = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

  const fetchTv = async () => {
    const res = await axios.get(tvUrl);
    return res.data;
  };

  const fetchTopRated = async () => {
    const res = await axios.get(topRatedTv);
    return res.data;
  };

  useEffect(() => {
    const fetchTvData = async () => {
      const data = await fetchTv();
      setTv(data.results);
    };

    const fetchTop = async () => {
      const data = await fetchTopRated();
      setTopRated(data.results);
      setIsLoading(false);
    };

    fetchTvData();
    fetchTop();
  }, []);

  return (
    <div className='bg-bgdarkb min-w-screen min-h-screen mt-18 pb-8 lg:mt-0'>

      <Search searchResults={searchResults} setSearchResults={setSearchResults} setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <div className='pt-14 pb-8 text-white lg:pt-1'>
        {isLoading ? (
          <div className='flex items-center justify-center'>Loading....</div>
        ) : (
          <>
            {searchResults.length === 0 ? (
              <div className='flex flex-col gap-8 py-10 pr-8 text-white lg:pl-36'>
                <DisplaySlider title={'Trending in TV'} array={tv} type={'Shows'} />
                <div>
                  <h1>TopRated In Tv</h1>
                  <div className='px-4 card-container flex flex-wrap gap-4'>
                    {topRated.length !== 0 ? (
                      topRated.map((tv, index) => {
                        return tv.name && tv.backdrop_path ? (
                          <CardPoster
                            id={tv.id}
                            key={index}
                            title={tv.name}
                            type={tv.media_type}
                            year={tv.first_air_date.slice(0, 4)}
                            img={`https://image.tmdb.org/t/p/original/${tv.poster_path}`}
                          />
                        ) : (
                          ''
                        );
                      })
                    ) : (
                      'No Shows'
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-wrap gap-4 pt-8 pl-32'>
                {searchResults.length !== 0 ? (
                  searchResults
                    .filter((movie) => movie.backdrop_path)
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
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Tv;
