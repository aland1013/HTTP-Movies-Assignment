import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AddMovie = ({ getMovieList }) => {
  const { push } = useHistory();
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    metascore: '',
    stars: []
  });

  const changeHandler = (e) => {
    e.persist();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/movies', {
        title: formData.title,
        director: formData.director,
        metascore: formData.metascore,
        stars: formData.stars.split(',').map((item) => item.trim())
      })
      .then((res) => {
        getMovieList();
        push('/');
      })
      .catch((err) => {
        console.err(err.message, err.response);
      });
  };

  return (
    <>
      <h3>AddMovie</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>
          Title:
          <input
            type='text'
            name='title'
            onChange={changeHandler}
            value={formData.title}
          />
        </label>
        <label htmlFor='director'>
          Director:
          <input
            type='text'
            name='director'
            onChange={changeHandler}
            value={formData.director}
          />
        </label>
        <label htmlFor='metascore'>
          Metascore:
          <input
            type='number'
            name='metascore'
            onChange={changeHandler}
            value={formData.metascore}
          />
        </label>
        <label htmlFor='stars'>
          Stars:
          <input
            type='text'
            name='stars'
            onChange={changeHandler}
            value={formData.stars}
          />
        </label>
        <button>add</button>
      </form>
    </>
  );
};

export default AddMovie;
