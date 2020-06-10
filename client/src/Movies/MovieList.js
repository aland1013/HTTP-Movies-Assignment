import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import styled from 'styled-components';

const Div = styled.div`
  width: 50px;
  margin: auto;
  background-color: #4caf50; /* Green */
  border: none;
  color: white !important;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
`;

function MovieList({ movies }) {
  return (
    <>
      <Div>
        <Link to='/add-movie'>Add</Link>
      </Div>
      <div className='movie-list'>
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default MovieList;
