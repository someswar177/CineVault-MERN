import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card.jsx';
import  Search  from '../components/Search.jsx';
import  DisplaySlider from '../components/DisplaySlider.jsx';


const Movies = () => {
  const [bolly, setBolly] = useState([]);
  const [tolly, setTolly] = useState([]);
  const [kolly, setKolly] = useState([]);
  const [Molly, setMolly] = useState([]);
  const [Sandal, setSandal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hindiMovieURl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_original_language=hi`;
  const teluguMovieURL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_original_language=te`;
  const tamilMovieURL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_original_language=ta`;
  const malayalamMovieURL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_original_language=ml`;
  const kannadaMovieURL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_original_language=kn`;


  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const fetchBolly = async () => {
    const res = await axios.get(hindiMovieURl);
    return res.data;
  };

  const fetchTolly = async () => {
    const res = await axios.get(teluguMovieURL);
    return res.data;
  };

  const fetchKolly = async () => {
    const res = await axios.get(tamilMovieURL);
    return res.data;
  };

  const fetchMolly = async () => {
    const res = await axios.get(malayalamMovieURL);
    return res.data;
  };

  const fetchSandal = async () => {
    const res = await axios.get(kannadaMovieURL);
    return res.data;
  };

  useEffect(() => {
    const fetchHindi = async () => {
      const hindi = await fetchBolly();
      setBolly(hindi.results);
    };

    const fetchTelugu = async () => {
      const telugu = await fetchTolly();
      setTolly(telugu.results);
    };

    const fetchTamil = async () => {
      const tamil = await fetchKolly();
      setMolly(tamil.results);
    };

    const fetchMalayalam = async () => {
      const Malayalam = await fetchMolly();
      setKolly(Malayalam.results);
    };

    const fetchKannada = async () => {
      const Kannada = await fetchSandal();
      setSandal(Kannada.results);
      setIsLoading(false);
    };

    fetchHindi();
    fetchTelugu();
    fetchTamil();
    fetchMalayalam();
    fetchKannada();
  }, []);

  return (
    <div className='p-2 bg-bgdarkb min-w-screen min-h-screen pb-8 lg:mt-0'>
       <Search searchResults={searchResults} setSearchResults={setSearchResults} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className='pt-10 text-white  lg:pl-32'>
        {isLoading ? (
          <div className='flex items-center justify-center '>Loading....</div>
        ) : (
          <>
            {searchResults.length === 0 ? (
              <div className='flex flex-col gap-4'>
                <DisplaySlider title={'Movies In Hindi'} array={bolly} type={'Movie'} />
                <DisplaySlider title={'Movies In Telugu'} array={tolly} type={'Movie'} />
                <DisplaySlider title={'Movies In Tamil'} array={kolly} type={'Movie'} />
                <DisplaySlider title={'Movies In Malayalam'} array={Molly} type={'Movie'} />
                <DisplaySlider title={'Movies In Kannada'} array={Sandal} type={'Movie'} />
              </div>
            ) : (
              <div className='flex flex-wrap gap-4'>
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

export default Movies;
