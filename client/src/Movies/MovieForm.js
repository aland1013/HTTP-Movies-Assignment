import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const H3 = styled.h3`
  text-align: center;
`;

const Form = styled.form`
  width: 50%;
  margin: auto;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 16px;
  margin: auto;
  cursor: pointer;
`;

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
      <H3>Update Movie</H3>
      <Form onSubmit={handleSubmit}>
        <label htmlFor='title'>
          Title:
          <Input
            type='text'
            name='title'
            onChange={changeHandler}
            value={movie.title}
          />
        </label>
        <label htmlFor='director'>
          Director:
          <Input
            type='text'
            name='director'
            onChange={changeHandler}
            value={movie.director}
          />
        </label>
        <label htmlFor='metascore'>
          Metascore:
          <Input
            type='number'
            name='metascore'
            onChange={changeHandler}
            value={movie.metascore}
          />
        </label>
        <br />
        <label htmlFor='stars'>
          Stars:
          <Input
            type='text'
            name='stars'
            onChange={changeHandler}
            value={movie.stars}
          />
        </label>
        <Button>update</Button>
      </Form>
    </>
  );
};

export default MovieForm;
