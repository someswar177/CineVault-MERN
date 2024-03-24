import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from './Card';

const DisplaySlider = ({ title, array, type }) => {
  return (
    <div className='px-8'>
      <h1 className='text-xl font-light'>{title}</h1>
      <Slider
        dots={false}
        infinite={false}
        speed={200}
        slidesToShow={4}
        slidesToScroll={4}
        initialSlide={0}
      >
        {array.length !== 0 ? (
          array.map((item, index) => {
            const cardTitle = type === 'Shows' ? item.original_name || '' : item.title || '';
            const cardYear =
              type === 'Shows'
                ? (item.first_air_date && item.first_air_date.slice(0, 4)) || ''
                : (item.release_date && item.release_date.slice(0, 4)) || '';

            return cardTitle && cardYear && item.backdrop_path ? (
              <Card
                id={item.id}
                key={index}
                title={cardTitle}
                year={cardYear}
                type={item.media_type}
                img={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
              />
            ) : null;
          })
        ) : (
          `No ${type}`
        )}
      </Slider>
    </div>
  );
};


export default DisplaySlider;