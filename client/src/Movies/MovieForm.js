import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const MovieForm = ({ getMovieList }) => {
  const { push } = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    metascore: '',
    stars: []
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie({ ...res.data, stars: res.data.stars.toString() });
      })
      .catch((err) => console.error(err.message, err.response));
  }, [id]);

  const changeHandler = (e) => {
    e.persist();

    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, {
        ...movie,
        stars: movie.stars.split(',').map((item) => item.trim())
      })
      .then((res) => {
        getMovieList();
        push(`/`);
      })
      .catch((err) => console.error(err.message, err.response));
  };

  return (
    <>
      <h3>Update Movie</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>
          Title:
          <input
            type='text'
            name='title'
            onChange={changeHandler}
            value={movie.title}
          />
        </label>
        <label htmlFor='director'>
          Director:
          <input
            type='text'
            name='director'
            onChange={changeHandler}
            value={movie.director}
          />
        </label>
        <label htmlFor='metascore'>
          Metascore:
          <input
            type='number'
            name='metascore'
            onChange={changeHandler}
            value={movie.metascore}
          />
        </label>
        <label htmlFor='stars'>
          Stars:
          <input
            type='text'
            name='stars'
            onChange={changeHandler}
            value={movie.stars}
          />
        </label>
        <button>update</button>
      </form>
    </>
  );
};

export default MovieForm;
